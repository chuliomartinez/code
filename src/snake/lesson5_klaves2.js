/*
## Aby si vedel pohybovať hadom hore a dole pridaj podmienku, ktorá testuje smer
"ArrowUp" a "ArrowDown".

### 1.Pridaj premennu y, ktorá funguje podobne ako premenná x. 

*/
var x = 0;
var smer = "ArrowRight";

function kresli() {
	if (smer == "ArrowRight")
		x = x + 1;
	else if (smer == "ArrowLeft")
		x = x - 1;

	clearScreen();
	putPixel(x, 4, "red");
}

function klaves(ktory) {
	smer = ktory;
}