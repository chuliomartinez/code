/*
Podmienka vykona nasledujuci kod iba ak je pravdiva.

if (test)
	vyraz

takto sa pouziva: 
    if (x > 20)
		x = 0;
		
pouzi podmienku aby had neusiel z obrazovky
*/
var x = 0;

function kresli() {
	x = x + 1;
	clearScreen();
	putPixel(x, 4, "red");
}
