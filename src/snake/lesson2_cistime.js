/*
## Ak chceme vycistit obrazovku, pouzijeme funkciu

`clearScreen`

### takto sa pouziva: 
```
	clearScreen();
```
### Použi clearScreen aby had nezanechal stopu.
*/
var x = 0;

function kresli() {
	x = x + 1;
	putPixel(x, 4, "red");
}
