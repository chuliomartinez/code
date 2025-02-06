var x = 0;
var smer = "ArrowLeft";

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