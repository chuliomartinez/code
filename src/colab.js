
const docs = {
	'2025-02-12': {
		'karol': {
			'body': {
				'creator': "karol",
				'text': "document s textom\na novym riadok",
				'selection_start': 0,
				'selecttion_end': 0,
				'modifiedon': 0, // Date.now()
			},
			'mode': { 'editor': 'karol' }
		}
	}
}

const create_shared_editor = (userid, textarea, on_mode_changed) => {

	let doc_state = {
		userid: userid,
		path: '',
		body: {},
		mode: {},
		textarea: textarea,
	}

	const SERVER_URL = "https://editor-63150-default-rtdb.europe-west1.firebasedatabase.app/"

	const getFirebaseToken = () => {
		return null;
	}

	const sse_prepare_url = async (path) => {
		const token = await getFirebaseToken();
		if (path && path.at(-1) !== '/')
			path += "/"
		let url = SERVER_URL + path + ".json";
		if (token)
			url += "?auth=" + token;
		return url;
	}

	const sse_fetch = async (path, init) => {
		const url = await sse_prepare_url(path);
		const resp = await fetch(url, init);
		if (!resp.ok) {
			let errorMessage = "Server error";
			try {
				errorMessage = await resp.text();
			}
			catch { }
			throw new Error(errorMessage);
		}
		return resp;
	}

	const sse_patch = async (path, data) => {
		try {
			const init = {
				"body": JSON.stringify(data),
				"method": "PATCH",
				"headers": {
					"Content-Type": "application/json",
				}
			}
			await sse_fetch(path, init);
		}
		catch (err) {
			console.log(err);
		}
	}

	let sse_instance;
	const sse_unlisten = () => {
		if (sse_instance) {
			sse_instance.close();
			sse_instance = null;
		}
	}
	const sse_listen = async (path, handler) => {

		const handleSSEvent = (d) => {
			const ev = JSON.parse(d);
			//if (ev.path === '/')
			console.log('handleSSEvent: [ ' + ev.path + " ] " + d);
			handler(ev.data, ev.path);
		}

		const url = await sse_prepare_url(path);
		const evtSource = new EventSource(url);
		evtSource.addEventListener('open', function (e) {
			console.log("SSE open");
			// Connection was opened.
		}, false);
	
		evtSource.onmessage = (event) => {
			const data = event.data;
			//console.log("SSE EVENT: " + data);
		};
		evtSource.onerror = (event) => {
			const data = event.data;
			//console.log("ERROR SSE EVENT: " + data);
		}
		//magic goes here!
		evtSource.addEventListener("patch", function (e) {
			//console.log("SSE Patch UP - " + e.data);
			handleSSEvent(e.data);
		}, false);
		//And here!
		evtSource.addEventListener("put", function (e) {
			//console.log("SSE Put UP - " + e.data);
			handleSSEvent(e.data);
		}, false);

		sse_unlisten();
		sse_instance = evtSource;
	}

	const is_user_editor = () => {
		return doc_state.mode.editor === doc_state.userid;
	}

	const make_document_body = () => {
		const tb = doc_state.textarea;
		return { text: tb.value, selectionStart: tb.selectionStart, selectionEnd: tb.selectionEnd };
	}

	const on_textarea_changed = (e) => {
		if (is_user_editor()) {
			console.log("on_textarea_changed uploading");
			const body = make_document_body();
			sse_patch(doc_state.path + "/body", body);
		} else {
			console.log("on_textarea_changed IGNORED");
			// ignore...
		}
	}

	const toggle_editor = () => {
		const doc_author = doc_state.path.split('/')[1];
		const new_editor = is_user_editor() ? doc_author : doc_state.userid;
		console.log("toggle_editor:" + new_editor);
		sse_patch(doc_state.path + "/mode", { editor: new_editor, running: 0 });
		// we could call on_sse_mode_changed here, or just wait until we got the event
	}

	const get_documents = async () => {
		const resp = await sse_fetch("");
		const docs = await resp.json();
		const paths = []
		for (const dt of Object.keys(docs)) {
			const names = docs[dt];
			for (const name of Object.keys(names)) {
				paths.push(dt + "/" + name);
			}
		}
		return paths;
	}

	const observe_document = (path) => {
		sse_unlisten();

		doc_state.path = path;
		doc_state.body = {};
		doc_state.mode = {};
		on_sse_mode_changed({ editor: "", running: 0 });
	}

	const create_document = async (path) => {
		sse_unlisten();

		doc_state.path = path;
		doc_state.body = {};
		doc_state.mode = {};
		const new_mode = { editor: doc_state.userid, running: 0 };
		await sse_patch(doc_state.path, {
			body: make_document_body(),
			mode: new_mode,
		});
		on_sse_mode_changed(new_mode);
	}

	const on_sse_mode_changed = (e) => {
		//const new_mode = e;
		if (doc_state.mode.editor !== e.editor) {
			doc_state.mode.editor = e.editor;

			const editable = is_user_editor();
			doc_state.textarea.disabled = !editable;

			console.log(`on_sse_mode_changed: edit:${editable}`);

			on_mode_changed(doc_state.path, editable);

			doc_state.textarea.removeEventListener('input', on_textarea_changed);
			doc_state.textarea.removeEventListener('select', on_textarea_changed);
			if (editable) {
				doc_state.textarea.addEventListener('input', on_textarea_changed);
				doc_state.textarea.addEventListener('select', on_textarea_changed);
			}

			if (editable) {
				sse_listen(doc_state.path + "/mode", d => {
					console.log(`listed_editable got event`);
					on_sse_mode_changed(d);
				});
			} else {
	
				sse_listen(doc_state.path, (data, path) => {

					console.log(`listed_readonly got event`);
					let body = undefined;
					let mode = undefined;
					if (path === '/mode')
						mode = data;
					else if (path === '/body')
						body = data;
					else if (path === '/') {
						mode = data.mode;
						body = data.body;
					}

					if (body && !is_user_editor()) {
						const tb = doc_state.textarea;
						if (body.hasOwnProperty("text")) {
							doc_state.body.text = body.text;
							tb.value = body.text;
						}
						let selectionChanged = false;
						if (body.hasOwnProperty("selectionStart")) {
							doc_state.body.selectionStart = body.selectionStart;
							selectionChanged = true;
						}
						if (body.hasOwnProperty("selectionEnd")) {
							doc_state.body.selectionEnd = body.selectionEnd;
							selectionChanged = true;
						}

						if (selectionChanged) {
							const isDisabled = tb.disabled;
							tb.disabled = false;
							tb.setSelectionRange(doc_state.body.selectionStart, doc_state.body.selectionEnd);
							tb.disabled = isDisabled;
						}
					}

					if (mode) {
						on_sse_mode_changed(mode);
					}
				});
			}
		}
	}

	const set_user = (userid) => {
		doc_state.userid = userid; 
	}

	return {
		create_document,
		observe_document,
		get_documents,
		toggle_editor,
		is_user_editor,
		on_textarea_changed,
		set_user,
		//get_info,
	}
}
window.create_shared_editor = create_shared_editor;