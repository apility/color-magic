"use strict";

var hexRegExp = /#[0-9a-fA-F]{3,6}/i;
var rgbaRegExp = /rgba?\((?: +)?([0-9]{1,3})(?: +)?,(?: +)?([0-9]{1,3})(?: +)?,(?: +)?([0-9]{1,3})(?: +)?,?(?: +)?([0-1]?\.?[0-9]+)?(?: +)?\)/i;

/**
 * Creates a new instance of Color
 * @param {String} input - A CSS color string in hex, rgb, or rgba format
 */
function Color(input){

    var self = this;

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;

    if(typeof input === 'string'){

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
            this.r = parseInt(match[1]);
            this.g = parseInt(match[2]);
            this.b = parseInt(match[3]);
            this.a = parseInt(match[4]);
        }else{
            throw "Invalid input string. Must be hex, rgb, or rgba";
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

}

/**
 * Returns an rgba formatted string of the Color instance
 */
Color.prototype.toString = function(){
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
}

module.exports = Color;
