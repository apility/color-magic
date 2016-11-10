var Color = require('./index');

var colors = [
	"black",
	"#fff",
	"rgb(255,0,0)",
	"rgba(0,255,0,1)",
	"#0000ff",
	"transparent"
];

for(var i in colors){
	var color = new Color(colors[i]);
	console.log("Testing: '" + colors[i] + "'");
	console.log("toHex: " + color.toHex());
	console.log("toRGB: " + color.toRGB());
	console.log("toRGBA: " + color.toRGBA());
	console.log("toHSL: " + color.toHSL());
	console.log("toHSLA: " + color.toHSLA());
	console.log("contrast: " + color.contrast().toString());
	console.log("toName: " + color.toName());
	console.log("invert: " + color.invert().toString());
	console.log("=======================");
}