/*
Pole je premenna do ktorej si odlozime lubovolne mnozstvo cisiel.

takto sa vytvara: 
	var hadx = [2, 3];

takto sa pouziva
	hadx[0] = hadx[0] + 1;

Prve cislo je na pozicii 0, druhe na 1 atd.
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