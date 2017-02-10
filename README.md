# Color-Magic

A library for doing CSS color manipulation and conversion

[Live demo](https://rawgit.com/apility/color-magic/master/example.html)

## Construction

```javascript
let ColorMagic = require('ColorMagic');

// Can be constructed from all valid CSS color formats
let red = new ColorMagic('#f00');
let green = new ColorMagic('rgba(0,255,0,1)');
let blue = new ColorMagic('blue');

// Can also construct from these formats
let grey = new ColorMagic(128);
let magenta = new ColorMagic(255, 255, 0);
let cyan = new ColorMagic(0, 255, 255, 0.5);
let orange = new ColorMagic([255,165,0,1]);
```

## Complementary colors and contrasting colors

```javascript
// Find the font color that contrasts the best with out background color
let background = new ColorMagic('black');
let fontColor = new ColorMagic().contrast(background);

// Get the inverse color of a given color
let yellow = new ColorMagic('blue').invert();
```

## Mixing colors

```javascript
// Add colors
let red = new Color('red');
let green = new Color('green');
let blue = new Color('blue');

let white = new Color().add(red).add(green).add(blue);

// Subtract colors
let black = new Color(white).subtract(white);
```

## Building

To build, you need to have webpack installed. (`npm install -g webpack`)

Simply run `webpack` from this directory, and `color-magic.js` and `color-magic.js.map` will be built in the `dist` folder.
