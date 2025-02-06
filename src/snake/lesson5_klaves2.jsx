var x = 0;
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

	clearScreen();
	putPixel(x, y, "red");
}

function klaves(ktory) {
	smer = ktory;
}