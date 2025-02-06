/*
Pole vie rast (a zmensovat sa). Na pridavanie cisiel do pola su tieto metody.

pouzitie:
	var pole = [2];
	pole.push(3); // pridaj 3 na koniec [2,3]
	pole.unshift(1); // pridaj 1 na zaciatok [1,2,3]
	pole.pop(); odober posledny [1,2]
	pole.unshift(); odober prvy [2]

Ked je hlava hada na rovnakej pozicii ako jedlo, had narastie o jeden clanok.

Pomocnik:
	Had moze narast tak ze clanky sa nepohnu, ale iba pridame x,y ako novu hlavu.
	Ak chceme overit dve podmienky naraz pouzije spojime ich cez && (a sucasne).

*/
var hadx = [1, 2, 3];
var hady = [2, 2, 2];
var smer = "ArrowRight";

var jedlox = rand(10);
var jedloy = rand(10);

function kresli() {
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

	for (var i = 0; i < dlzka - 1; i++) {
		hadx[i] = hadx[i + 1];
		hady[i] = hady[i + 1];
	}

	hadx[hlava] = x;
	hady[hlava] = y;

	clearScreen();
	for (var i = 0; i < dlzka; i++) {
		putPixel(hadx[i], hady[i], "red");
	}

	putPixel(jedlox, jedloy, "green");
}

function klaves(ktory) {
	smer = ktory;
}