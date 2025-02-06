var x = 0;

function kresli() {
	x = x + 1;
	if (x > 20)
		x = 0;
	clearScreen();
	putPixel(x, 4, "red");
}
