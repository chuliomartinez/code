/*
Hra posiela velkost hracej plochy ako do funkcie kresli, ako sirka a vyska.

	function kresli(sirka, vyska)

Pouzi tieto premenne aby had pokracoval 
	- z lava ked je na pravom okraji
	- z prava ked je na lavom okraji

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

	// mnam mnam had nasiel jedlo
	if (x == jedlox && y == jedloy) {
		// nove jedlo
		jedlox = rand(10);
		jedloy = rand(10);

		hadx.push(x);
		hady.push(y);
		dlzka = dlzka + 1;
	} else {
	
		for (var i = 0; i < dlzka - 1; i++) {
			hadx[i] = hadx[i + 1];
			hady[i] = hady[i + 1];
		}

		hadx[hlava] = x;
		hady[hlava] = y;
	}

	clearScreen();
	for (var i = 0; i < dlzka; i++) {
		putPixel(hadx[i], hady[i], "red");
	}

	putPixel(jedlox, jedloy, "green");
}

function klaves(ktory) {
	smer = ktory;
}