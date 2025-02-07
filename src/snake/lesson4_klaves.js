/*
## Keď stlačíme kláves, spustí sa funkcia 
```
klaves(ktory)
```

### 1. Vytvor funkciu a ulož ktorý kláves sa stlačil do premennej. 
### 2. Použi podmienku aby si zvýšil alebo znížil x podľa toho či sa stlačil kláves ArrowRight alebo ArrowLeft

*/
var x = 0;

function kresli() {
	x = x + 1;
	clearScreen();
	putPixel(x, 4, "red");
}