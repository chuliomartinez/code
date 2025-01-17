var hadx = [2, 3];
var hady = [2, 2];
var smer = "ArrowRight";

function kresli() {
	var x = hadx[1]; // prve cislo je chvost na 0, druhe na 1, atd. pocitame od chvosta
	var y = hady[1];
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

	hadx[0] = hadx[1]; // telo tam kde bola hlava
	hady[0] = hady[1];
	hadx[1] = x; // nova hlava po pohybe
	hady[1] = y;

	clearScreen();
	putPixel(hadx[0], hady[0], "red");
	putPixel(hadx[1], hady[1], "black"); // hlava
}

function klaves(ktory) {
	smer = ktory;
}