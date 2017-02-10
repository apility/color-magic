var ColorMagic =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module color-magic
	 */
	
	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var multiConstructor = __webpack_require__(2);
	
	var r = Symbol('r');
	var g = Symbol('g');
	var b = Symbol('b');
	var a = Symbol('a');
	
	var Color = function () {
	
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
	    function Color(val) {
	        _classCallCheck(this, Color);
	
	        this[r] = new Uint8ClampedArray(1);
	        this[g] = new Uint8ClampedArray(1);
	        this[b] = new Uint8ClampedArray(1);
	        this[a] = 1;
	
	        var init = [0, 0, 0, 1];
	
	        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            params[_key - 1] = arguments[_key];
	        }
	
	        if (params.length == 0 && typeof val == 'number') {
	            init = [val, val, val, 1];
	        } else {
	            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object') {
	                if (val.hasOwnProperty('constructor')) {
	                    if (val instanceof Uint8ClampedArray && val.length == 4) {
	                        init = val;
	                    } else if (val.constructor === this.constructor) {
	                        init[0] = val.r;
	                        init[1] = val.g;
	                        init[2] = val.b;
	                        init[3] = val.a;
	                    } else {
	                        init = multiConstructor(val, params);
	                    }
	                }
	            } else {
	                init = multiConstructor(val, params);
	            }
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
	
	
	    _createClass(Color, [{
	        key: 'invert',
	        value: function invert() {
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
	
	    }, {
	        key: 'contrast',
	        value: function contrast(color) {
	            if (!(color.constructor === this.constructor)) {
	                color = new Color();
	            }
	
	            var Y = function Y(r, g, b) {
	                return (r + r + b + g + g + g + g) / 6;
	            };
	
	            var y = Y(color.r, color.g, color.b);
	            y = 255 - Math.round(y);
	
	            if (y > 127) {
	                this.r = 255;
	                this.g = 255;
	                this.b = 255;
	            } else {
	                this.r = 0;
	                this.g = 0;
	                this.b = 0;
	            }
	
	            return this;
	        }
	
	        /**
	         * Adds a Color to this Color instance
	         * 
	         * @param {Color} color
	         */
	
	    }, {
	        key: 'add',
	        value: function add(color) {
	            if (!(color.constructor === this.constructor)) {
	                color = new Color();
	            }
	
	            var mix = new Uint8Array(3);
	
	            mix[0] = this.r + color.r;
	            mix[1] = this.g + color.g;
	            mix[2] = this.b + color.b;
	
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
	
	    }, {
	        key: 'subtract',
	        value: function subtract(color) {
	            if (!(color.constructor === this.constructor)) {
	                color = new Color();
	            }
	
	            var mix = new Uint8Array(3);
	
	            mix[0] = this.r - color.r;
	            mix[1] = this.g - color.g;
	            mix[2] = this.b - color.b;
	
	            this.r = mix[0];
	            this.g = mix[1];
	            this.b = mix[2];
	
	            return this;
	        }
	
	        /**
	         * Returns the color instance as an RGBA CSS string
	         * @return {string}
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	        }
	
	        /**
	         * Red
	         * @type {number}
	         */
	
	    }, {
	        key: 'r',
	        get: function get() {
	            return this[r][0];
	        },
	        set: function set(val) {
	            this[r][0] = val | 0;
	        }
	
	        /**
	         * Green
	         * @type {number}
	         */
	
	    }, {
	        key: 'g',
	        get: function get() {
	            return this[g][0];
	        },
	        set: function set(val) {
	            this[g][0] = val | 0;
	        }
	
	        /**
	         * Blue
	         * @type {number}
	         */
	
	    }, {
	        key: 'b',
	        get: function get() {
	            return this[b][0];
	        },
	        set: function set(val) {
	            this[b][0] = val | 0;
	        }
	
	        /**
	         * Alpha
	         * @type {number}
	         */
	
	    }, {
	        key: 'a',
	        get: function get() {
	            return this[a];
	        },
	        set: function set(val) {
	            val = val > 1 ? 1 : val;
	            val = val < 0 ? 0 : val;
	            this[a] = val;
	        }
	    }]);
	
	    return Color;
	}();
	
	module.exports = Color;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var tests = [__webpack_require__(3), __webpack_require__(5), __webpack_require__(6)];
	
	function multiConstructor(val, params) {
	    var init = [0, 0, 0, 1];
	
	    switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
	        case 'object':
	            for (var i = 0; i < val.length; i++) {
	                if (i < init.length) {
	                    init[i] = val[i];
	                }
	            }
	            break;
	        case 'string':
	            for (var _i = 0; _i < tests.length; _i++) {
	                var result = tests[_i](val);
	                if (result) {
	                    init = result;
	                    break;
	                }
	            }
	            break;
	        case 'number':
	            init[0] = val;
	            for (var _i2 = 0; _i2 < params.length; _i2++) {
	                if (_i2 + 1 < init.length) {
	                    init[_i2 + 1] = params[_i2];
	                }
	            }
	            break;
	        default:
	            break;
	    }
	    return init;
	}
	
	module.exports = multiConstructor;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Colors = __webpack_require__(4);
	
	function fromName(str) {
	    var color = Colors.find(function (color) {
	        return color.name == str.toLowerCase();
	    });
	    return color ? [color.r, color.g, color.b, color.a] : false;
	}
	
	module.exports = fromName;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "aliceblue",
			"r": 240,
			"g": 248,
			"b": 255,
			"a": 1
		},
		{
			"name": "antiquewhite",
			"r": 250,
			"g": 235,
			"b": 215,
			"a": 1
		},
		{
			"name": "aqua",
			"r": 0,
			"g": 255,
			"b": 255,
			"a": 1
		},
		{
			"name": "aquamarine",
			"r": 127,
			"g": 255,
			"b": 212,
			"a": 1
		},
		{
			"name": "azure",
			"r": 240,
			"g": 255,
			"b": 255,
			"a": 1
		},
		{
			"name": "beige",
			"r": 245,
			"g": 245,
			"b": 220,
			"a": 1
		},
		{
			"name": "bisque",
			"r": 255,
			"g": 228,
			"b": 196,
			"a": 1
		},
		{
			"name": "black",
			"r": 0,
			"g": 0,
			"b": 0,
			"a": 1
		},
		{
			"name": "blanchedalmond",
			"r": 255,
			"g": 235,
			"b": 205,
			"a": 1
		},
		{
			"name": "blue",
			"r": 0,
			"g": 0,
			"b": 255,
			"a": 1
		},
		{
			"name": "blueviolet",
			"r": 138,
			"g": 43,
			"b": 226,
			"a": 1
		},
		{
			"name": "brown",
			"r": 165,
			"g": 42,
			"b": 42,
			"a": 1
		},
		{
			"name": "burlywood",
			"r": 222,
			"g": 184,
			"b": 135,
			"a": 1
		},
		{
			"name": "cadetblue",
			"r": 95,
			"g": 158,
			"b": 160,
			"a": 1
		},
		{
			"name": "chartreuse",
			"r": 127,
			"g": 255,
			"b": 0,
			"a": 1
		},
		{
			"name": "chocolate",
			"r": 210,
			"g": 105,
			"b": 30,
			"a": 1
		},
		{
			"name": "coral",
			"r": 255,
			"g": 127,
			"b": 80,
			"a": 1
		},
		{
			"name": "cornflowerblue",
			"r": 100,
			"g": 149,
			"b": 237,
			"a": 1
		},
		{
			"name": "cornsilk",
			"r": 255,
			"g": 248,
			"b": 220,
			"a": 1
		},
		{
			"name": "crimson",
			"r": 220,
			"g": 20,
			"b": 60,
			"a": 1
		},
		{
			"name": "cyan",
			"r": 0,
			"g": 255,
			"b": 255,
			"a": 1
		},
		{
			"name": "darkblue",
			"r": 0,
			"g": 0,
			"b": 139,
			"a": 1
		},
		{
			"name": "darkcyan",
			"r": 0,
			"g": 139,
			"b": 139,
			"a": 1
		},
		{
			"name": "darkgoldenrod",
			"r": 184,
			"g": 134,
			"b": 11,
			"a": 1
		},
		{
			"name": "darkgray",
			"r": 169,
			"g": 169,
			"b": 169,
			"a": 1
		},
		{
			"name": "darkgreen",
			"r": 0,
			"g": 100,
			"b": 0,
			"a": 1
		},
		{
			"name": "darkgrey",
			"r": 169,
			"g": 169,
			"b": 169,
			"a": 1
		},
		{
			"name": "darkkhaki",
			"r": 189,
			"g": 183,
			"b": 107,
			"a": 1
		},
		{
			"name": "darkmagenta",
			"r": 139,
			"g": 0,
			"b": 139,
			"a": 1
		},
		{
			"name": "darkolivegreen",
			"r": 85,
			"g": 107,
			"b": 47,
			"a": 1
		},
		{
			"name": "darkorange",
			"r": 255,
			"g": 140,
			"b": 0,
			"a": 1
		},
		{
			"name": "darkorchid",
			"r": 153,
			"g": 50,
			"b": 204,
			"a": 1
		},
		{
			"name": "darkred",
			"r": 139,
			"g": 0,
			"b": 0,
			"a": 1
		},
		{
			"name": "darksalmon",
			"r": 233,
			"g": 150,
			"b": 122,
			"a": 1
		},
		{
			"name": "darkseagreen",
			"r": 143,
			"g": 188,
			"b": 143,
			"a": 1
		},
		{
			"name": "darkslateblue",
			"r": 72,
			"g": 61,
			"b": 139,
			"a": 1
		},
		{
			"name": "darkslategray",
			"r": 47,
			"g": 79,
			"b": 79,
			"a": 1
		},
		{
			"name": "darkslategrey",
			"r": 47,
			"g": 79,
			"b": 79,
			"a": 1
		},
		{
			"name": "darkturquoise",
			"r": 0,
			"g": 206,
			"b": 209,
			"a": 1
		},
		{
			"name": "darkviolet",
			"r": 148,
			"g": 0,
			"b": 211,
			"a": 1
		},
		{
			"name": "deeppink",
			"r": 255,
			"g": 20,
			"b": 147,
			"a": 1
		},
		{
			"name": "deepskyblue",
			"r": 0,
			"g": 191,
			"b": 255,
			"a": 1
		},
		{
			"name": "dimgray",
			"r": 105,
			"g": 105,
			"b": 105,
			"a": 1
		},
		{
			"name": "dimgrey",
			"r": 105,
			"g": 105,
			"b": 105,
			"a": 1
		},
		{
			"name": "dodgerblue",
			"r": 30,
			"g": 144,
			"b": 255,
			"a": 1
		},
		{
			"name": "firebrick",
			"r": 178,
			"g": 34,
			"b": 34,
			"a": 1
		},
		{
			"name": "floralwhite",
			"r": 255,
			"g": 250,
			"b": 240,
			"a": 1
		},
		{
			"name": "forestgreen",
			"r": 34,
			"g": 139,
			"b": 34,
			"a": 1
		},
		{
			"name": "fuchsia",
			"r": 255,
			"g": 0,
			"b": 255,
			"a": 1
		},
		{
			"name": "gainsboro",
			"r": 220,
			"g": 220,
			"b": 220,
			"a": 1
		},
		{
			"name": "ghostwhite",
			"r": 248,
			"g": 248,
			"b": 255,
			"a": 1
		},
		{
			"name": "gold",
			"r": 255,
			"g": 215,
			"b": 0,
			"a": 1
		},
		{
			"name": "goldenrod",
			"r": 218,
			"g": 165,
			"b": 32,
			"a": 1
		},
		{
			"name": "gray",
			"r": 128,
			"g": 128,
			"b": 128,
			"a": 1
		},
		{
			"name": "green",
			"r": 0,
			"g": 128,
			"b": 0,
			"a": 1
		},
		{
			"name": "greenyellow",
			"r": 173,
			"g": 255,
			"b": 47,
			"a": 1
		},
		{
			"name": "grey",
			"r": 128,
			"g": 128,
			"b": 128,
			"a": 1
		},
		{
			"name": "honeydew",
			"r": 240,
			"g": 255,
			"b": 240,
			"a": 1
		},
		{
			"name": "hotpink",
			"r": 255,
			"g": 105,
			"b": 180,
			"a": 1
		},
		{
			"name": "indianred",
			"r": 205,
			"g": 92,
			"b": 92,
			"a": 1
		},
		{
			"name": "indigo",
			"r": 75,
			"g": 0,
			"b": 130,
			"a": 1
		},
		{
			"name": "ivory",
			"r": 255,
			"g": 255,
			"b": 240,
			"a": 1
		},
		{
			"name": "khaki",
			"r": 240,
			"g": 230,
			"b": 140,
			"a": 1
		},
		{
			"name": "lavender",
			"r": 230,
			"g": 230,
			"b": 250,
			"a": 1
		},
		{
			"name": "lavenderblush",
			"r": 255,
			"g": 240,
			"b": 245,
			"a": 1
		},
		{
			"name": "lawngreen",
			"r": 124,
			"g": 252,
			"b": 0,
			"a": 1
		},
		{
			"name": "lemonchiffon",
			"r": 255,
			"g": 250,
			"b": 205,
			"a": 1
		},
		{
			"name": "lightblue",
			"r": 173,
			"g": 216,
			"b": 230,
			"a": 1
		},
		{
			"name": "lightcoral",
			"r": 240,
			"g": 128,
			"b": 128,
			"a": 1
		},
		{
			"name": "lightcyan",
			"r": 224,
			"g": 255,
			"b": 255,
			"a": 1
		},
		{
			"name": "lightgoldenrodyellow",
			"r": 250,
			"g": 250,
			"b": 210,
			"a": 1
		},
		{
			"name": "lightgray",
			"r": 211,
			"g": 211,
			"b": 211,
			"a": 1
		},
		{
			"name": "lightgreen",
			"r": 144,
			"g": 238,
			"b": 144,
			"a": 1
		},
		{
			"name": "lightgrey",
			"r": 211,
			"g": 211,
			"b": 211,
			"a": 1
		},
		{
			"name": "lightpink",
			"r": 255,
			"g": 182,
			"b": 193,
			"a": 1
		},
		{
			"name": "lightsalmon",
			"r": 255,
			"g": 160,
			"b": 122,
			"a": 1
		},
		{
			"name": "lightseagreen",
			"r": 32,
			"g": 178,
			"b": 170,
			"a": 1
		},
		{
			"name": "lightskyblue",
			"r": 135,
			"g": 206,
			"b": 250,
			"a": 1
		},
		{
			"name": "lightslategray",
			"r": 119,
			"g": 136,
			"b": 153,
			"a": 1
		},
		{
			"name": "lightslategrey",
			"r": 119,
			"g": 136,
			"b": 153,
			"a": 1
		},
		{
			"name": "lightsteelblue",
			"r": 176,
			"g": 196,
			"b": 222,
			"a": 1
		},
		{
			"name": "lightyellow",
			"r": 255,
			"g": 255,
			"b": 224,
			"a": 1
		},
		{
			"name": "lime",
			"r": 0,
			"g": 255,
			"b": 0,
			"a": 1
		},
		{
			"name": "limegreen",
			"r": 50,
			"g": 205,
			"b": 50,
			"a": 1
		},
		{
			"name": "linen",
			"r": 250,
			"g": 240,
			"b": 230,
			"a": 1
		},
		{
			"name": "magenta",
			"r": 255,
			"g": 0,
			"b": 255,
			"a": 1
		},
		{
			"name": "maroon",
			"r": 128,
			"g": 0,
			"b": 0,
			"a": 1
		},
		{
			"name": "mediumaquamarine",
			"r": 102,
			"g": 205,
			"b": 170,
			"a": 1
		},
		{
			"name": "mediumblue",
			"r": 0,
			"g": 0,
			"b": 205,
			"a": 1
		},
		{
			"name": "mediumorchid",
			"r": 186,
			"g": 85,
			"b": 211,
			"a": 1
		},
		{
			"name": "mediumpurple",
			"r": 147,
			"g": 112,
			"b": 219,
			"a": 1
		},
		{
			"name": "mediumseagreen",
			"r": 60,
			"g": 179,
			"b": 113,
			"a": 1
		},
		{
			"name": "mediumslateblue",
			"r": 123,
			"g": 104,
			"b": 238,
			"a": 1
		},
		{
			"name": "mediumspringgreen",
			"r": 0,
			"g": 250,
			"b": 154,
			"a": 1
		},
		{
			"name": "mediumturquoise",
			"r": 72,
			"g": 209,
			"b": 204,
			"a": 1
		},
		{
			"name": "mediumvioletred",
			"r": 199,
			"g": 21,
			"b": 133,
			"a": 1
		},
		{
			"name": "midnightblue",
			"r": 25,
			"g": 25,
			"b": 112,
			"a": 1
		},
		{
			"name": "mintcream",
			"r": 245,
			"g": 255,
			"b": 250,
			"a": 1
		},
		{
			"name": "mistyrose",
			"r": 255,
			"g": 228,
			"b": 225,
			"a": 1
		},
		{
			"name": "moccasin",
			"r": 255,
			"g": 228,
			"b": 181,
			"a": 1
		},
		{
			"name": "navajowhite",
			"r": 255,
			"g": 222,
			"b": 173,
			"a": 1
		},
		{
			"name": "navy",
			"r": 0,
			"g": 0,
			"b": 128,
			"a": 1
		},
		{
			"name": "oldlace",
			"r": 253,
			"g": 245,
			"b": 230,
			"a": 1
		},
		{
			"name": "olive",
			"r": 128,
			"g": 128,
			"b": 0,
			"a": 1
		},
		{
			"name": "olivedrab",
			"r": 107,
			"g": 142,
			"b": 35,
			"a": 1
		},
		{
			"name": "orange",
			"r": 255,
			"g": 165,
			"b": 0,
			"a": 1
		},
		{
			"name": "orangered",
			"r": 255,
			"g": 69,
			"b": 0,
			"a": 1
		},
		{
			"name": "orchid",
			"r": 218,
			"g": 112,
			"b": 214,
			"a": 1
		},
		{
			"name": "palegoldenrod",
			"r": 238,
			"g": 232,
			"b": 170,
			"a": 1
		},
		{
			"name": "palegreen",
			"r": 152,
			"g": 251,
			"b": 152,
			"a": 1
		},
		{
			"name": "paleturquoise",
			"r": 175,
			"g": 238,
			"b": 238,
			"a": 1
		},
		{
			"name": "palevioletred",
			"r": 219,
			"g": 112,
			"b": 147,
			"a": 1
		},
		{
			"name": "papayawhip",
			"r": 255,
			"g": 239,
			"b": 213,
			"a": 1
		},
		{
			"name": "peachpuff",
			"r": 255,
			"g": 218,
			"b": 185,
			"a": 1
		},
		{
			"name": "peru",
			"r": 205,
			"g": 133,
			"b": 63,
			"a": 1
		},
		{
			"name": "pink",
			"r": 255,
			"g": 192,
			"b": 203,
			"a": 1
		},
		{
			"name": "plum",
			"r": 221,
			"g": 160,
			"b": 221,
			"a": 1
		},
		{
			"name": "powderblue",
			"r": 176,
			"g": 224,
			"b": 230,
			"a": 1
		},
		{
			"name": "purple",
			"r": 128,
			"g": 0,
			"b": 128,
			"a": 1
		},
		{
			"name": "rebeccapurple",
			"r": 102,
			"g": 51,
			"b": 153,
			"a": 1
		},
		{
			"name": "red",
			"r": 255,
			"g": 0,
			"b": 0,
			"a": 1
		},
		{
			"name": "rosybrown",
			"r": 188,
			"g": 143,
			"b": 143,
			"a": 1
		},
		{
			"name": "royalblue",
			"r": 65,
			"g": 105,
			"b": 225,
			"a": 1
		},
		{
			"name": "saddlebrown",
			"r": 139,
			"g": 69,
			"b": 19,
			"a": 1
		},
		{
			"name": "salmon",
			"r": 250,
			"g": 128,
			"b": 114,
			"a": 1
		},
		{
			"name": "sandybrown",
			"r": 244,
			"g": 164,
			"b": 96,
			"a": 1
		},
		{
			"name": "seagreen",
			"r": 46,
			"g": 139,
			"b": 87,
			"a": 1
		},
		{
			"name": "seashell",
			"r": 255,
			"g": 245,
			"b": 238,
			"a": 1
		},
		{
			"name": "sienna",
			"r": 160,
			"g": 82,
			"b": 45,
			"a": 1
		},
		{
			"name": "silver",
			"r": 192,
			"g": 192,
			"b": 192,
			"a": 1
		},
		{
			"name": "skyblue",
			"r": 135,
			"g": 206,
			"b": 235,
			"a": 1
		},
		{
			"name": "slateblue",
			"r": 106,
			"g": 90,
			"b": 205,
			"a": 1
		},
		{
			"name": "slategray",
			"r": 112,
			"g": 128,
			"b": 144,
			"a": 1
		},
		{
			"name": "slategrey",
			"r": 112,
			"g": 128,
			"b": 144,
			"a": 1
		},
		{
			"name": "snow",
			"r": 255,
			"g": 250,
			"b": 250,
			"a": 1
		},
		{
			"name": "springgreen",
			"r": 0,
			"g": 255,
			"b": 127,
			"a": 1
		},
		{
			"name": "steelblue",
			"r": 70,
			"g": 130,
			"b": 180,
			"a": 1
		},
		{
			"name": "tan",
			"r": 210,
			"g": 180,
			"b": 140,
			"a": 1
		},
		{
			"name": "teal",
			"r": 0,
			"g": 128,
			"b": 128,
			"a": 1
		},
		{
			"name": "thistle",
			"r": 216,
			"g": 191,
			"b": 216,
			"a": 1
		},
		{
			"name": "tomato",
			"r": 255,
			"g": 99,
			"b": 71,
			"a": 1
		},
		{
			"name": "transparent",
			"r": 0,
			"g": 0,
			"b": 0,
			"a": 0
		},
		{
			"name": "turquoise",
			"r": 64,
			"g": 224,
			"b": 208,
			"a": 1
		},
		{
			"name": "violet",
			"r": 238,
			"g": 130,
			"b": 238,
			"a": 1
		},
		{
			"name": "wheat",
			"r": 245,
			"g": 222,
			"b": 179,
			"a": 1
		},
		{
			"name": "white",
			"r": 255,
			"g": 255,
			"b": 255,
			"a": 1
		},
		{
			"name": "whitesmoke",
			"r": 245,
			"g": 245,
			"b": 245,
			"a": 1
		},
		{
			"name": "yellow",
			"r": 255,
			"g": 255,
			"b": 0,
			"a": 1
		},
		{
			"name": "yellowgreen",
			"r": 154,
			"g": 205,
			"b": 50
		}
	];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var expr = /(rgba?)\((?:\s+)?((:?[0-9]{1,3}(?:\s+)?,?(?:\s+)?){1,3}(?:\s+)?(:?\d(?:\.\d+)?)?)(?:\s+)?\)/gim;
	
	function fromRGBA(val) {
	    if (val.match(expr)) {
	        var result = expr.exec(val);
	        var mode = result[1];
	        var data = result[2].split(',');
	        for (var i = 0; i < 3; i++) {
	            data[i] = parseInt(data[i]);
	        }
	        data[3] = 1;
	        if (mode === 'rgba') {
	            if (data.length == 4) {
	                data[3] = parseFloat(data[3]);
	            }
	        }
	        return data;
	    }
	    return false;
	}
	
	module.exports = fromRGBA;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var expr = /#([\da-f]{6}|[\da-f]{3})/gim;
	
	function fromHEX(val) {
	    if (val.match(expr)) {
	        var data = [];
	        var result = expr.exec(val)[1];
	        if (result.length == 3) {
	            data.push(parseInt('0x' + result[0]) * 17);
	            data.push(parseInt('0x' + result[1]) * 17);
	            data.push(parseInt('0x' + result[2]) * 17);
	        } else {
	            data.push(parseInt('0x' + result[0] + result[1]));
	            data.push(parseInt('0x' + result[2] + result[3]));
	            data.push(parseInt('0x' + result[4] + result[5]));
	        }
	        data.push(1);
	        return data;
	    }
	    return false;
	}
	
	module.exports = fromHEX;

/***/ }
/******/ ]);
//# sourceMappingURL=color-magic.js.map