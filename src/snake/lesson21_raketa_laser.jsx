/*
## Základy
- Do programu píšeme vždy jeden príkaz na jeden riadok
- Čísla píšeme normálne 
- Text píšeme v uvodzovkách "blue", "red"

## Príkazy

### Premenná
Premenná je **Šuflík** kam si môžeme odložiť číslo alebo text.

Vytvoríme 
`var x`
Priradíme (dáme do šuflíka)
`var y = 4`

`x`je meno premennej. Keď ho použijeme v programe, nahradí sa aktuálnou hodnotou v šuflíku.

### Matematicke
`y = (9 + 3) * 2`  
`+` `-` `*` `/` ako ste zvyknuty z matematiky. Zatvorky tiez funguju rovnako.
Medzery pridajte tak aby sa vam dobre citalo. Program ich ignoruje.

### Podmienka
Vykona prikaz iba ak je podmienka splnena.
```
if (podmienka)
	robNieco()
```
Jednoducha podmienka lava strana je rovna mensia, vacsia ako prava. 
```
if (x > 10)
if (x < 10)
if (x == 10) // pozor dve rovna-sa!
```

Napriklad
```
if (klaves == "z")
	color = "gold"
```

### Volanie funckie
`meno_funkcie (prvy_parameter, druhy_paramter, ...)`

## Kreslenie

### Na obrazovku kreslíme

```
putPixel(pozicia_x, pozicia_y, farba)
// priklad
putPixel(4, 4, "red");`
```

### Pred kreslením obrazovku vyčistíme

` clearScreen()`

### Bitmap kreslime 
```
raketa1 = 
"   x   "+
"  xxx  "+
"  x x  "+
"  xxx  "+
" xxxxx "+
kresliBitmap(1,1,raketa1,"gold")
```

*/

function kresliBitmap(vlavo, hore, bitmap){
	var x = 0;
	var y = 0;
	var i = 0;
	while(i < bitmap.length) {
		var pixel = bitmap[i];
		if (pixel === '\n') {
			x=0;
			y=y+1;
		} else if (pixel === '\r') {
			// nerob nic
		} else {

			if (pixel === 'r')
				putPixel(vlavo + x, hore + y, "red");
			else if (pixel === 'g')
				putPixel(vlavo + x, hore + y, "green");
			else if (pixel === 'x')
				putPixel(vlavo + x, hore + y, "black");
			x = x + 1;
		}
			
		i++;
	}
}

var raketa1 = `
  x   
 xxx  
 x x  
 xxx  
xxxxx 
 r r   
 r r `;  

var raketa2 = `
  x   
 xxx  
 x x  
 xxx  
xxxxx 
   
 r r   
 r r `; 

var laser = `
 g
 g
ggg
 g
`

var krok = 1;
var raketa_x = 10;
var raketa_y = 30;
var laser_x = 10;
var laser_y = 0;

function kresli() {

	clearScreen();

	var bitmap = raketa1;
	if ((krok % 2) === 1)
		bitmap = raketa2;
	krok = krok + 1;

	if (laser_y > 40) {
		laser_y = 0;
		laser_x = rand(30);
	} else {
		laser_y = laser_y + 1;
	}

	kresliBitmap(laser_x, laser_y, laser);

	kresliBitmap(raketa_x, raketa_y, bitmap);
}

function klaves(ktory) {
	if (ktory == "ArrowLeft")
		raketa_x = raketa_x - 1;
	else if (ktory == "ArrowRight")
		raketa_x = raketa_x + 1;
}