"use strict";

let Colors = require('../colors.json');

function fromName(str) {
    let color = Colors.find(color => {
        return color.name == str.toLowerCase(); 
    });
    return color ? [color.r, color.g, color.b, color.a] : false;
}

module.exports = fromName;