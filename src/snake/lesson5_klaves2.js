/*
Aby si vedel pohybovat hadom hore a dole pridaj podmienku ktora testuje smer
"ArrowUp" a "ArrowDown".

Pridaj premennu y, ktora funguje podobne ako premenna x. 

*/
var x = 0;
var smer = "ArrowRight";

function kresli() {
	if (smer == "ArrowRight")
		x = x + 1;
	else if (smer == "ArrowLeft")
		x = x - 1;

	clearScreen();
	putPixel(x, 4, "red");
}

function klaves(ktory) {
	smer = ktory;
}