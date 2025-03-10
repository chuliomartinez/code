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

*/

function kresli() {

	clearScreen();

	putPixel(4, 4, "red");
}

function klaves(ktory) {
	
}