var x = 3;
var y = 0;
var telox = 2;
var teloy = 0;
var chvostx = 1;
var chvosty = 0;
var smer = "ArrowRight";

function kresli() {
	var hlavax = x;
	var hlavay = y;
	if (smer == "ArrowRight")
		x = x + 1;
	else if (smer == "ArrowLeft")
		x = x - 1;
	else if (smer == "ArrowUp")
		y = y - 1;
	else if (smer == "ArrowDown")
		y = y + 1;
	else
		return; // nerob nic ked sa nehybeme

	chvostx = telox;
	chvosty = teloy;
	telox = hlavax;
	teloy = hlavay;

	clearScreen();
	putPixel(x, y, "red");
	putPixel(telox, teloy, "red");
	putPixel(chvostx, chvosty, "red");
}

function klaves(ktory) {
	smer = ktory;
}