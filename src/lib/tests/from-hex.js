const expr = /#([\da-f]{6}|[\da-f]{3})/gim;

function fromHEX(val){
    if(val.match(expr)){
        let data = [];
        let result = expr.exec(val)[1];
        if(result.length == 3){
            data.push((parseInt('0x' + result[0])) * 17);
            data.push((parseInt('0x' + result[1])) * 17);
            data.push((parseInt('0x' + result[2])) * 17);
        }else{
            data.push(parseInt('0x' + result[0]  + result[1]));
            data.push(parseInt('0x' + result[2]  + result[3]));
            data.push(parseInt('0x' + result[4]  + result[5]));
        }
        data.push(1);
        return data;
    }
    return false;
}

module.exports = fromHEX;