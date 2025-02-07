/*
## Podmienka vykoná nasledujúci príkaz iba ak je pravdivá.
```
if (test)
	prikaz
```
### Takto sa používa: 
```
    if (x > 20)
		x = 0;
	else if(x < 0)
		x = 20;
```

Porovnanie na rovnosť sú dve **rovná-sa**. Obyčajne **rovná-sa** používame na priradenie!
```
	if (x == 20)
		x = 0;
```

### Použi podmienku aby had neušiel z obrazovky.
*/
var x = 0;

function kresli() {
	x = x + 1;
	clearScreen();
	putPixel(x, 4, "red");
}
