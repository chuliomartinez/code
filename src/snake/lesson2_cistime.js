/*
## Ak chceme vyčistiť obrazovku, použijeme funkciu

`clearScreen`

### Takto sa používa: 
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
