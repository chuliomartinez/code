/*
## Funkcia rand vrati nahodne cislo, od 0 po maximum. 

```
	rand(max)
```

### Takto sa pouziva: 
```
    var jedlox = rand(10); // nahodne 0 az 9 
```

### 1. Vyuzi funkciu rand, nove premenne a putPixel aby si nakreslil jedlo.
Jedlo bude pixel zelenej farby.

*/
var hadx = [1, 2, 3];
var hady = [2, 2, 2];
var smer = "ArrowRight";

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
}

function klaves(ktory) {
	smer = ktory;
}