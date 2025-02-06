/*
## Zjednodusme vypocet pozicie hlavy.
*/
var hadx = [1, 2, 3];
var hady = [2, 2, 2];
var smer = "ArrowRight";

var jedlox = rand(10);
var jedloy = rand(10);

function kresli(sirka, vyska) {
	var dlzka = hadx.length; // spytame sa pola ake je dlhe
	var hlava = dlzka - 1;
	var x = hadx[hlava];
	var y = hady[hlava];
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

function klaves(ktory) {
	smer = ktory;
}