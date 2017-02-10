const expr = /(rgba?)\((?:\s+)?((:?[0-9]{1,3}(?:\s+)?,?(?:\s+)?){1,3}(?:\s+)?(:?\d(?:\.\d+)?)?)(?:\s+)?\)/gim;

function fromRGBA(val){
    if(val.match(expr)){
        let result = expr.exec(val);
        let mode = result[1];
        let data = result[2].split(',');
        for(let i = 0; i < 3; i++){
            data[i] = parseInt(data[i]);
        }
        data[3] = 1;
        if(mode === 'rgba'){
            if(data.length == 4){
                data[3] = parseFloat(data[3]);
            }
        }
        return data;
    }
    return false;
}

module.exports = fromRGBA;