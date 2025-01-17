



function main() {
	const SCALE = 20;
	let SPEED = 300;
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

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
       
        for (let x = 0; x < canvas.width/SCALE; x++) {
          ctx.moveTo(x * SCALE + 0.5, 0.5); 
          ctx.lineTo(x * SCALE +0.5, canvas.height +0.5);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height/SCALE; y++) {
          ctx.moveTo(0.5, y*SCALE + 0.5);
          ctx.lineTo(canvas.width+0.5, y * SCALE + 0.5);
          ctx.stroke();
        }
        //ctx.strokeRect(0, 0, GAME_WIDTH * SCALE, GAME_HEIGHT * SCALE);
	}

	const paintFrame = () => {
		//console.log('xx');
		const w = canvas.width / SCALE | 0;
		const h = canvas.height / SCALE | 0;
		evalResult.kresli(w, h);
		paintGrid();
		tm = window.setTimeout(paintFrame, SPEED);
	}

	const updateButtons = () => {
		//startBtn.disabled = !!tm;
		stopBtn.disabled = !tm;
		btnGrid.innerHTML = gridVisible ? "Schovaj Mriezku" : "Zobraz Mriezku";
	}

	const startGame = (e) => {
	
		stopGame();

		try {
			let tt = code.value;
			const t = `(function x() {
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
		catch (e) {
			console.log(e);
		}
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
				const nl = v.lastIndexOf('\n', start-1);
				const line = v.substring(nl + 1, start);
				const z = line.trim();
				let ws = 0;
				let w = "";
				while (line[ws]==='' || line[ws]==='\t') {
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
	})

	startBtn.addEventListener("click", startGame);
	stopBtn.addEventListener('click', stopGame);
	btnGrid.addEventListener('click', showGrid);
	updateButtons();
}

window.onload = main;