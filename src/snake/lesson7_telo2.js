/*
Pridaj hadovi aj chvost. 

Pomocnik:
chvost bude tam kde bolo predtym telo.
*/
var x = 3;
var y = 0;
var telox = 2;
var teloy = 0;
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

	telox = hlavax;
	teloy = hlavay;

	clearScreen();
	putPixel(x, y, "red");
	putPixel(telox, teloy, "red");
}

function klaves(ktory) {
	smer = ktory;
}