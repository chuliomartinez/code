/*
Ked stlacime klaves, spusti sa funckia 

klaves(ktory)

vytvor funkciu a uloz ktory klaves sa stlacil do premennej. 
Pouzi podmienku aby si zvysil alebo znizil x podla toho ci sa stlacil klaves ArrowRight alebo ArrowLeft

*/

var x = 0;

function kresli() {
	x = x + 1;
	clearScreen();
	putPixel(x, 4, "red");
}