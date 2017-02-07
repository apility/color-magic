/**
 * @module color-magic
 */

"use strict";

let multiConstructor = require('./lib/multi-constructor.js');

let r = Symbol('r');
let g = Symbol('g');
let b = Symbol('b');
let a = Symbol('a');

class Color {

    /**
     * Constructs a new Color instance
     * Can be constructed from rgb/rgba string, 
     * hex string, or a color name.
     * If only one number is given, it will construct a grey tone.
     * If three numbers are given, they will be counted as r,g,b
     * If four numbers are given, they will be counted as r,g,b,a
     * 
     * Examples:
     * new Color(20)
     * new Color(0,0,0)
     * new Color(0,0,0,0.5)
     * new Color([10,20,30])
     * new Color([40,50,60,0.9])
     * new Color('#fff')
     * new Color('#c9c8c7')
     * new Color('rgb(33,44,55)')
     * new Color('rga(54,53,52,0.4))
     * new Color('magenta')
     */
    constructor(val, ...params){

        this[r] = new Uint8ClampedArray(1);
        this[g] = new Uint8ClampedArray(1);
        this[b] = new Uint8ClampedArray(1);
        this[a] = 1;

        let init = [0,0,0,1];

        if(params.length == 0 && typeof val == 'number'){
            init = [val, val, val, 1];
        }else{
            init = multiConstructor(val, params);
        }

        this.r = init[0];
        this.g = init[1];
        this.b = init[2];
        this.a = init[3];
    }

    /**
     * Inverts this Color instance to get the complementary color
     * 
     * @param {Color} color
     */
    invert(){
        this.r = 255 - this.r;
        this.g = 255 - this.g;
        this.b = 255 - this.b;
        return this;
    }

    /**
     * Given a Color, this color instance will change to the best constrasting color
     * 
     * @param {Color} color
     */
    contrast(color){
        if(!(color instanceof Color)){
            color = new Color();
        }

        let lumonosity = 0;

        function getLumonosity(c){
            c = c / 255;
            if(c <= 0.03928){
                c = c / 12.92;
            }else{
                c = ((c + 0.055) / 1.055) ^ 2.4;
            }
            return c;
        }

        let r = getLumonosity(color.r);
        let g = getLumonosity(color.g);
        let b = getLumonosity(color.b);

        lumonosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        if(lumonosity > Math.sqrt(1.05 * 0.05) - 0.05){
            this.r = 0;
            this.g = 0;
            this.b = 0;
        }else{
            this.r = 255;
            this.g = 255;
            this.b = 255;
        }

        return this;
    }

    /**
     * Adds a Color to this Color instance
     * 
     * @param {Color} color
     */
    add(color){
        if(!(color instanceof Color)){
            color = new Color();
        }

        let mix = new Uint8Array(3);

        mix[0] = (this.r + color.r);
        mix[1] = (this.g + color.g);
        mix[2] = (this.b + color.b);

        this.r = mix[0];
        this.g = mix[1];
        this.b = mix[2];

        return this;
    }

    /**
     * Subtract a Color from this Color instance
     * 
     * @param {Color} color
     */
    subtract(color){
        if(!(color instanceof Color)){
            color = new Color();
        }

        let mix = new Uint8Array(3);

        mix[0] = (this.r - color.r);
        mix[1] = (this.g - color.g);
        mix[2] = (this.b - color.b);

        this.r = mix[0];
        this.g = mix[1];
        this.b = mix[2];

        return this;
    }

    /**
     * Returns the color instance as an RGBA CSS string
     * @return {string}
     */
    toString(){
        return(`rgba(${this.r},${this.g},${this.b},${this.a})`);
    }

    /**
     * Red
     * @type {number}
     */
    get r(){
        return this[r][0];
    }

    set r(val){
        this[r][0] = val | 0;
    }
    
    /**
     * Green
     * @type {number}
     */
    get g(){
        return this[g][0];
    }

    set g(val){
        this[g][0] = val | 0;
    }

    /**
     * Blue
     * @type {number}
     */
    get b(){
        return this[b][0];
    }

    set b(val){
        this[b][0] = val | 0;
    }

    /**
     * Alpha
     * @type {number}
     */
    get a(){
        return this[a];
    }
    
    set a(val){
        val = val > 1 ? 1 : val;
        val = val < 0 ? 0 : val;
        this[a] = val;
    }

}

module.exports = Color;
