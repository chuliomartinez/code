/*
Nakresli telo hada pomocou putPixel.
Telo vzdy nasleduje hlavu, teda bude tam kde bola predtym hlava.

Pomocnik:
Odloz si poziciu hlavy predtym ako sa zmeni x,y.

*/
var x = 3;
var y = 0;
var smer = "ArrowRight";

function kresli() {
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

	clearScreen();
	putPixel(x, y, "red");
}

function klaves(ktory) {
	smer = ktory;
}