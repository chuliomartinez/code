var color = "red"

function box(vlavo, hore, sirka, vyska, farba) {

	var y = 0;
	while (y < vyska) {

		var x = 0;
		while (x < sirka) {
			putPixel(vlavo + x, hore + y, farba);
			x = x + 1;
		}

		y = y + 1;
	}
}

function kresli() {

	clearScreen();

	box(2, 2, 10, 10, "green");
	box(4, 4, 6, 6, "red");
}

function klaves(ktory) {
	if (ktory == "z")
		color = "gold"
	else if (ktory === "r")
		color = "red"
}