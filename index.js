/**
 * @module color-magic
 */

"use strict";

var hexRegExp = /#[0-9a-fA-F]{3,6}/i;
var rgbaRegExp = /rgba?\((?: +)?((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?(?: +)?\)/i;
var hslaRegExp = /(hsla?)\((?: +)?([0-9]{0,3})(?: +)?,(?: +)?([0-9]{0,3})(?: +)?\%(?: +)?,(?: +)?([0-9]{0,3})(?: +)?\%(?: +)?(?:,(?: +)?1?\.?([0-9]+)?(?: +)?)?(?: +)?\)/i;

var colors = require('./colors.json');

/**
 * Array.find polyfill
 */
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     'use strict';
     if (this == null) {
       throw new TypeError('Array.prototype.find called on null or undefined');
     }
     if (typeof predicate !== 'function') {
       throw new TypeError('predicate must be a function');
     }
     var list = Object(this);
     var length = list.length >>> 0;
     var thisArg = arguments[1];
     var value;

     for (var i = 0; i < length; i++) {
       value = list[i];
       if (predicate.call(thisArg, value, i, list)) {
         return value;
       }
     }
     return undefined;
    }
  });
}

/**
 * Creates a new instance of Color
 * @class Color
 * @param {String} input - A CSS color string in hex, rgb, or rgba format
 */
function Color(input){

    var self = this;

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;

    if(typeof input === 'string'){

        var color = colors.find(function(color){
            return color.name.toLowerCase() === input.toLowerCase();
        });

        if(typeof color !== 'undefined'){
            input = color.value;
        }

        if(hexRegExp.test(input)){
            input = input.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b){
                return r + r + g + g + b + b;
            })
            var match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
            this.r = parseInt(match[1], 16);
            this.g = parseInt(match[2], 16);
            this.b = parseInt(match[3], 16);
            this.a = 1.0;
        }else if(rgbaRegExp.test(input)){
            var match = rgbaRegExp.exec(input);
            this.r = parseInt(match[2]);
            this.g = parseInt(match[3]);
            this.b = parseInt(match[4]);
            this.a = (match[1].toLowerCase() === 'rgba' ? parseInt(match[5]) : 1);
        }else if(hslaRegExp.test(input)){
            var match = hslaRegExp.exec(input);
            var h = parseInt(match[2]) / 360;
            var s = parseInt(match[3]) / 100;
            var l = parseInt(match[4]) / 100;
            this.a = (match[1].toLowerCase() === 'hsla' ? parseInt(match[5]) : 1);
            var r, g, b;

            if(s == 0){
                r = g = b = l; // achromatic
            }else{
                var hue2rgb = function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            this.r = Math.round(r * 255); 
            this.g = Math.round(g * 255);
            this.b = Math.round(b * 255);      
        }else{
            throw "Invalid input string";
        }
    }
    
    this.r = this.r > 255 ? 255 : this.r;
    this.g = this.g > 255 ? 255 : this.g;
    this.b = this.b > 255 ? 255 : this.b;
    this.a = this.a > 1 ? 1 : this.a;

    this.r = this.r < 0 ? 0 : this.r;
    this.g = this.g < 0 ? 0 : this.g;
    this.b = this.b < 0 ? 0 : this.b;
    this.a = this.a < 0 ? 0 : this.a;

    this.r = isNaN(this.r) ? 0 : this.r;
    this.g = isNaN(this.g) ? 0 : this.g;
    this.b = isNaN(this.b) ? 0 : this.b;
    this.a = isNaN(this.a) ? 0 : this.a;

    return this;
}

/**
 * Returns an rgba formatted string of the Color instance
 */
Color.prototype.toString = function(){
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
}

/**
 * Inverts the Color instance
 */
Color.prototype.invert = function(){
    this.r = 255 - this.r;
    this.g = 255 - this.g;
    this.b = 255 - this.b;
    return this;
}

/**
 * Returns black or white color depending on the Color instance
 * The returned color will be the opposite contrast of the Color instance
 * @return {Color}
 */
Color.prototype.contrast = function(){
    if((this.r * 0.299 + this.g * 0.587 + this.b * 0.114) > 186){
        return new Color("#000");
    }
    return new Color("#fff");
}

/**
 * Returns the hex color string of the Color instance
 * @return {String}
 */
Color.prototype.toHex = function(){
    return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
}

/**
 * Returns the rgb color string of the Color instance
 * @return {String}
 */
Color.prototype.toRGB = function(){
    return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
}

/**
 * Returns the rgba color string of the Color instance
 * @return {String}
 */
Color.prototype.toRGBA = function(){
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
}

/**
 * Returns the hsl color string of the Color instance
 * @return {String}
 */
Color.prototype.toHSL = function(){
    var r = this.r;
    var g = this.g;
    var b = this.b;

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}

/**
 * Returns the hsla color string of the Color instance
 * @return {String}
 */
Color.prototype.toHSLA = function(){
    return this.toHSL().slice(0,-1) + ',' + this.a + ')';
}

/**
 * Returns the name of the Color instance or undefined
 * @return {String}
 */
Color.prototype.toName = function(){
    var self = this;
    var color = colors.find(function(color){
        return color.value.toLowerCase() === self.toHex().toLowerCase();
    });

    if(typeof color !== 'undefined'){
        return color.name.toLowerCase();
    }

    return 'undefined';
}

module.exports = Color;
