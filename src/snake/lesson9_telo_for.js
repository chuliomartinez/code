/*
Ked chceme precitat (alebo zapisat) cislo v poli mozme pouzit dalsiu premennu.

	var hadx = [2, 3];
	hadx[0] = hadx[0] + 1; 

mozme napisat aj takto
	var hadx = [2, 3];
	var i = 0;
	hadx[i] = hadx[i] + 1; 

naco to je dobre? Aby sme pouzili cyklus:
	for (var i = 0; i < 3; i = i + 1) {
		// sem piseme kod
	}
	
pouzi for cyklus na kreslenie hada.

skus pouzit cyklus na nastavenie pozicie tela.

*/
var hadx = [2, 3];
var hady = [2, 2];
var smer = "ArrowRight";

function kresli() {
// na jednotke je hlava, na nule je chvost
	var x = hadx[1];
	var y = hady[1];
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

	hadx[0] = hadx[1]; // telo tam kde bola hlava
	hady[0] = hady[1];
	hadx[1] = x; // nova hlava po pohybe
	hady[1] = y;

	clearScreen();
	putPixel(hadx[0], hady[0], "red");
	putPixel(hadx[1], hady[1], "black"); // hlava
}

function klaves(ktory) {
	smer = ktory;
}