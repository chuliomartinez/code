var hadx = [1, 2, 3];
var hady = [2, 2, 2];
var dlzka = 3;
var smer = "ArrowRight";

function kresli() {
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

	for (var i = 0; i < hlava; i++) {
		hadx[i] = hadx[i + 1];
		hady[i] = hady[i + 1];
	}

	hadx[hlava] = x;
	hady[hlava] = y;

	clearScreen();
	for (var i = 0; i < dlzka; i++) {
		putPixel(hadx[i], hady[i], "red");
	}
}

function klaves(ktory) {
	smer = ktory;
}