var hadx = [1, 2, 3];
var hady = [2, 2, 2];
var dx = 1;
var dy = 0;

var jedlox = rand(10);
var jedloy = rand(10);

function kresli(sirka, vyska) {
	var dlzka = hadx.length; // spytame sa pola ake je dlhe
	var hlava = dlzka - 1;
	var x = hadx[hlava] + dx;
	var y = hady[hlava] + dy;
	
	if (x < 0)
		x = sirka - 1;
	else if (x >= sirka)
		x = 0;
	if (y < 0)
		y = vyska - 1;
	else if (y >= vyska)
		y = 0;

	// mnam mnam had nasiel jedlo
	if (x == jedlox && y == jedloy) {
		// nove jedlo
		jedlox = rand(sirka);
		jedloy = rand(vyska);
	} else {
		hadx.shift();
		hady.shift();
	}
	hadx.push(x);
	hady.push(y);

	clearScreen();
	for (var i = 0; i < hadx.length; i++) {
		putPixel(hadx[i], hady[i], "red");
	}

	putPixel(jedlox, jedloy, "green");
}

function klaves(smer) {
	if (smer == "ArrowRight") {
		dx = 1;
		dy = 0;
	} else if (smer == "ArrowLeft") {
		dx = -1;
		dy = 0;
	} else if (smer == "ArrowUp") {
		dx = 0;
		dy = -1;
	} else if (smer == "ArrowDown") {
		dx = 0;
		dy = 1;
	}
}