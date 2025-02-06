/*
## Dlzku pola si nemusime pamatat, pole vie svoju dlzku.

### Takto sa pouziva
```
	var hadx = [2, 3];
	var dlzka = hadx.length; // 2
```

### Pouzi length a sprav hada ktory ma 3 (alebo viac:) clankov.
*/
var hadx = [2, 3];
var hady = [2, 2];
var dlzka = 2;
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

	for (var i = 0; i < dlzka - 1; i = i + 1) {
		hadx[i] = hadx[i + 1]; // telo tam kde bola hlava
		hady[i] = hady[i + 1];
	}
	hadx[1] = x; // nova hlava po pohybe
	hady[1] = y;

	clearScreen();
	for (var i = 0; i < dlzka; i = i + 1) {
		putPixel(hadx[i], hady[i], "red");
	}
}

function klaves(ktory) {
	smer = ktory;
}