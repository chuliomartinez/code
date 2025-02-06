var had = [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }];
var d = { x: 1, y: 0 };

var jedlo = { x: rand(10), y: rand(10) };

function kresli(sirka, vyska) {
	var dlzka = had.length; // spytame sa pola ake je dlhe
	var hlava = dlzka - 1;
	var x = had[hlava].x + d.x;
	var y = had[hlava].y + d.y;
	
	if (x < 0)
		x = sirka - 1;
	else if (x >= sirka)
		x = 0;
	if (y < 0)
		y = vyska - 1;
	else if (y >= vyska)
		y = 0;

	// mnam mnam had nasiel jedlo
	if (x == jedlo.x && y == jedlo.y) {
		// nove jedlo
		jedlo.x = rand(sirka);
		jedlo.y = rand(vyska);
	} else {
		had.shift();
	}
	had.push({ x: x, y: y });

	clearScreen();
	for (var i = 0; i < had.length; i++) {
		putPixel(had[i].x, had[i].y, "red");
	}

	putPixel(jedlo.x, jedlo.y, "green");
}

function klaves(smer) {
	if (smer == "ArrowRight") {
		d = { x: 1, y: 0 };
	} else if (smer == "ArrowLeft") {
		d = { x: -1, y: 0 };
	} else if (smer == "ArrowUp") {
		d = { x: 0, y: -1 };
	} else if (smer == "ArrowDown") {
		d = { x: 0, y: 1 };
	}
}