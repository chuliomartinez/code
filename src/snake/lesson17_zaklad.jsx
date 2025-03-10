var color = "red"
function kresli() {

	clearScreen();

	putPixel(4, 4, color);
}

function klaves(ktory) {
	if (ktory == "z")
		color = "gold"
	else if (ktory === "r")
		color = "red"
}