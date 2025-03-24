
function box(vlavo, hore, sirka, vyska, farba) {

	var y = 0;
	while (y < vyska) {

		var x = 0;
		while (x < sirka) {
			putPixel(vlavo + x, hore + y, farba);
			x = x + 1;
		}

		y = y + 1;
	}
}

function kresliBitmap(vlavo, hore, sirka, vyska, bitmap, farba) {
	var y = 0;
	while (y < vyska) {

		var x = 0;
		while (x < sirka) {
			var pixel = bitmap[y * sirka + x];
			if (pixel == 1)
				putPixel(vlavo + x, hore + y, farba);
			x = x + 1;
		}

		y = y + 1;
	}
}

function alien(vlavo, hore, farba) {
	const bitmap = [
		0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 0,
		1, 1, 0, 1, 1, 0, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 1, 0, 0, 1, 0, 0,
		0, 1, 0, 1, 1, 0, 1, 0,
		1, 0, 1, 0, 0, 1, 0, 1
	]
	kresliBitmap(vlavo, hore, 8, 8, bitmap, farba);
}
function alien2(vlavo, hore, farba) {
	const bitmap = [
		0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 0,
		1, 1, 0, 1, 1, 0, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1,
		0, 1, 0, 1, 1, 0, 1, 0,
		1, 0, 0, 0, 0, 0, 0, 1,
		0, 1, 0, 0, 0, 0, 1, 0
	]
	kresliBitmap(vlavo, hore, 8, 8, bitmap, farba);
}
function invader(vlavo, hore, farba) {
	const bitmap = [
		0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
		1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
	];
	kresliBitmap(vlavo, hore, 11, 8, bitmap, farba);
}

var faza = 1;
var x = 0;
var y = 0;
var farba = "red";
var smer = "";

function kresli() {

	clearScreen();

	if (smer == "ArrowRight")
		x = x + 1;
	else if (smer == "ArrowLeft")
		x = x - 1;
	else if (smer == "ArrowUp")
		y = y - 1;
	else if (smer == "ArrowDown")
		y = y + 1;

	if (faza == 1) {
		alien(x, y, farba);
		alien2(x+10, y, farba);
		faza = 2;
	}
	else {
		alien2(x, y, farba);
		alien(x+10, y, farba);
		faza = 1;
	}
}

function klaves(ktory) {
	if (ktory == "z")
		color = "gold"
	else if (ktory === "r")
		color = "red"

	smer = ktory;
}