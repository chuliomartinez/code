



function main() {
	const SCALE = 20;
	let SPEED = 300;
	const canvas = document.getElementById('canvas');
	const lessonText = document.getElementById('lessonText');
	const ctx = canvas.getContext('2d');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	function putPixel(x, y, color) {
		ctx.fillStyle = color;
		const rx = x * SCALE;
		const ry = y * SCALE;
		ctx.fillRect(rx, ry, SCALE, SCALE);
	}
	window.putPixel = putPixel;
	window.clearScreen = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	window.rand = (max) => {
		return (Math.random() * max) | 0;
	}

	const startBtn = document.getElementById('btnRun');
	const stopBtn = document.getElementById('btnStop');
	const btnGrid = document.getElementById('btnGrid');
	const code = document.getElementById('code');

	let evalResult;

	let tm;
	const stopGame = () => {
		if (tm)
			window.clearTimeout(tm);
		tm = 0;
		evalResult = undefined;
		updateButtons();
	}

	let gridVisible = false;
	const showGrid = () => {
		gridVisible = !gridVisible;
		updateButtons();
	}

	const paintGrid = () => {
		if (!gridVisible)
			return;
		ctx.save();
		ctx.strokeStyle = "gray";
		ctx.lineWidth = 0.5;
       
		for (let x = 0; x < canvas.width / SCALE; x++) {
			ctx.moveTo(x * SCALE + 0.5, 0.5);
			ctx.lineTo(x * SCALE + 0.5, canvas.height + 0.5);
			ctx.stroke();
		}
		for (let y = 0; y < canvas.height / SCALE; y++) {
			ctx.moveTo(0.5, y * SCALE + 0.5);
			ctx.lineTo(canvas.width + 0.5, y * SCALE + 0.5);
			ctx.stroke();
		}
		//ctx.strokeRect(0, 0, GAME_WIDTH * SCALE, GAME_HEIGHT * SCALE);
	}

	const paintFrame = () => {
		//console.log('xx');
		const w = canvas.width / SCALE | 0;
		const h = canvas.height / SCALE | 0;
		evalResult.kresli(w, h, SCALE, ctx);
		paintGrid();
		tm = window.setTimeout(paintFrame, SPEED);
	}

	const updateButtons = () => {
		//startBtn.disabled = !!tm;
		stopBtn.disabled = !tm;
		btnGrid.innerHTML = gridVisible ? "Schovaj Mriezku" : "Zobraz Mriezku";

		document.body.classList.toggle("playing", !!tm);
		document.body.classList.toggle("stopped", !tm);
	}

	const startGame = (e) => {
	
		stopGame();
		clearScreen();

		//try {
		{
			let tt = code.value;
			const t = `
var kresli = undefined;
var klaves = undefined;	
(function x() {
${tt}

let __evalResult = {};
try {
__evalResult.kresli = kresli;
__evalResult.klaves = klaves;
}
catch {
}

return __evalResult;
		})();`
			evalResult = eval(t);
			tm = window.setTimeout(paintFrame, SPEED);
			updateButtons();
		}
		//catch (e) {
		//	console.log(e);
		//}
	}

	code.addEventListener("keydown", function (e) {
		const v = this.value;
		const start = this.selectionStart;
		const end = this.selectionEnd;
		if (e.key == 'Tab') {
			e.preventDefault();
			
		
			// set textarea value to: text before caret + tab + text after caret
			this.value = v.substring(0, start) + "\t" + v.substring(end);
		
			// put caret at right position again
			this.selectionStart = this.selectionEnd = start + 1;
		} else if (e.key === 'Enter') {
			if (end === start) {
				e.preventDefault();
				const nl = v.lastIndexOf('\n', start - 1);
				const line = v.substring(nl + 1, start);
				const z = line.trim();
				let ws = 0;
				let w = "";
				while (line[ws] === '' || line[ws] === '\t') {
					w += line[ws];
					ws++;
				}
				if (z.startsWith("for") || z.startsWith("if") || z.startsWith("function"), z.startsWith("while")) {
					w += '\t';
				}

				this.value = v.substring(0, start) + '\n' + w + v.substring(end);
				this.selectionStart = this.selectionEnd = start + 1 + w.length;
			}
		}
	});

	window.addEventListener("keydown", (e) => {
		if (e.key === "F5") {
			if (e.shiftKey)
				stopGame();
			else
				startGame();
			return;
		} else if (e.metaKey || e.ctrlKey || e.altKey) {
			return;
		}

		if (evalResult?.klaves) {
			evalResult.klaves(e.key);
			e.preventDefault();
			e.stopPropagation();
		}
	});

	startBtn.addEventListener("click", startGame);
	stopBtn.addEventListener('click', stopGame);
	btnGrid.addEventListener('click', showGrid);
	updateButtons();

	const lessons = [
		//{ name: "lesson_init.js", label: "Začíname" },
		{ name: "lesson0_kreslime.js", label: "Kreslíme pixel" },
		{ name: "lesson1_premenna.js", label: "Premenná" },
		{ name: "lesson2_cistime.js", label: "Čistíme obrazovku" },
		{ name: "lesson3_podmienka.js", label: "Podmienka" },
		{ name: "lesson4_klaves.js", label: "Stlačený kláves", init: 3 },
		{ name: "lesson5_klaves2.js", label: "Stlačený kláves 2" },
		{ name: "lesson6_telo.js", label: "Telo hada" },
		{ name: "lesson7_telo2.js", label: "Telo a chvost hada" },
		{ name: "lesson8_telo_pole.js", label: "Telo ako pole" },
		{ name: "lesson9_telo_for.js", label: "Kreslíme telo cez for cyklus" },
		{ name: "lesson10_telo_for_len.js", label: "Kreslíme telo, dĺžka pola" },
		{ name: "lesson11_jedlo.js", label: "Kreslíme jedlo" },
		{ name: "lesson12_jedlo_zjest.js", label: "Had chce jesť" },
		{ name: "lesson13_okraje.js", label: "Had a okraje" },
		{ name: "lesson14_pole_zmaz.js", label: "Zjednodušme kreslenie" },
		{ name: "lesson15_smer_hada.js", label: "Smer hada" },
		{ name: "lesson16_had_object.js", label: "Had ako object" },
		{ name: "lesson17_zaklad.js", label: "Zaklad" },
	];

	const setCodeFromLessons = async (index, solution = false) => {
		stopGame();
		const url = "snake/" + lessons[index].name + (solution ? "x" : "");
		const resp = await fetch(url);
		let text = await resp.text();

		if (text.startsWith("/*")) {
			const end = text.indexOf("*/");
			const lt = text.substring(2, end);
			text = text.substring(end + 3);
			const mk = marked.parse(lt);
			lessonText.innerHTML = mk;
		}

		code.value = text;
		colab?.on_textarea_changed();
	}

	let oldText = "";
	const chooseLesson = async (e) => {
		oldText = "";
		let index = +e.target.value;
		await setCodeFromLessons(index);
	}

	const lessonCombo = document.getElementById("selLesson");
	lessonCombo.addEventListener("change", chooseLesson);

	document.getElementById('btnResult').addEventListener("click", () => {
		if (oldText) {
			code.value = oldText;
			oldText = "";
		} else {
			oldText = code.value;
			const index = +lessonCombo.value;
			setCodeFromLessons(index, true);
		}
	})

	const setupCombo = (cb, items) => {
		for (item of items) {
			var opt = document.createElement('option');
			opt.value = item.value;
			opt.innerHTML = item.label;
			cb.appendChild(opt);
		}
	}

	setupCombo(lessonCombo, lessons.map((x, i) => ({ value: i, label: "" + (i + 1) + ". " + lessons[i].label })));
	// for (let i = 1; i < lessons.length; i++) {	
	// 	var opt = document.createElement('option');
	// 	opt.value = i;
	// 	opt.innerHTML = "" + i + ". " + lessons[i].label;
	// 	lessonCombo.appendChild(opt);
	// }

	setCodeFromLessons(0);


	// Prepare colab
	let userid = "miro";
	let colab = undefined;

	const docCombo = document.getElementById('docCombo');
	const btnColabState = document.getElementById('btnDocState');

	const onModeChanged = (path, is_editor) => {
		const btnColabState = document.getElementById('btnDocState');
		btnColabState.innerHTML = path;// + ' [' + (is_editor ? "upravujem" : "pozeram") + "]";
		btnColabState.style.background = is_editor ? "" : "#ff474c";
	}

	const updateStatus = () => {
		// const info = colab.get_info() || {};
		// btnColabState.innerHTML = info.path + ' [' + (colab.is_editor() ? "EDIT" : "VIEW") + "]";
	}
	const newDocument = async () => {
		//document.getElementById('btnNewDoc').disabled = true;
		let name = (window.prompt('Prosim zadaj svoje meno:') || "").trim();
		name = name.replaceAll('/', '_').toLocaleLowerCase();
		if (!name) {
			return;
		}
		userid = name;
		if (userid === "miro") {
			document.body.classList.add("teacher");
		} else {
			btnColabState.disabled = 1;
		}
		let path = new Date().toISOString().substring(0, 10) + "/" + userid;
		// check if exists?
		colab = window.create_shared_editor(userid, code, onModeChanged);
		//colab.set_user(userid)
		const docs = await colab.get_documents();
		if (docs.indexOf(path) >= 0) {
			colab.observe_document(path);
		}
		else {
			await colab.create_document(path);
		}

		updateStatus();
		updateDocList();
	}
			
	btnColabState.addEventListener('click', () => {
		if (!colab)
			newDocument();
		else
			colab.toggle_editor();
	});

	const updateDocList = async () => {
		const docs = await colab.get_documents();
		docCombo.innerHTML = '';
		setupCombo(docCombo, docs.map(x => ({ value: x, label: x })));
	}
	
	document.getElementById('btnColabRefresh').addEventListener('click', updateDocList);

	docCombo.addEventListener('change', () => {
		// stop edit mode when switching documents.
		if (colab.is_user_editor())
			colab.toggle_editor();
		colab.observe_document(docCombo.value);
		updateStatus();
	});

	//document.getElementById('btnNewDoc').addEventListener("click", newDocument)
	//prepareColab();
}

window.onload = main;