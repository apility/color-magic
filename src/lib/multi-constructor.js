"use strict";

let tests = [
    require('./tests/from-name.js'),
    require('./tests/from-rgba.js'),
    require('./tests/from-hex.js')
];

function multiConstructor(val, params){
    let init = [0, 0, 0, 1];

    switch(typeof val){
        case 'object':
            for(let i = 0; i < val.length; i++){
                if(i < init.length){
                    init[i] = val[i];
                }
            }
            break;
        case 'string':
            for(let i = 0; i < tests.length; i++){
                let result = tests[i](val);
                if(result){
                    init = result;
                    break;
                }
            }
            break;
        case 'number':
            init[0] = val;
            for(let i = 0; i < params.length; i++){
                if((i + 1) < init.length){
                    init[i + 1] = params[i];
                }
            }
            break;
        default:
            break;
    }
    return init;
}

module.exports = multiConstructor;