var expect    = require("chai").expect;
var Color = require("../index");

describe("Color from string input", function() {

    describe("From Hex", function() {
        var red = "#f00";
        var green = "#00ff00";
        var blue = "#00h";

        it("returns the color in rgba", function(done) {
            expect(new Color(red).toString()).to.equal("rgba(255,0,0,1)");
            done();
        });

        it("returns the color in rgba", function(done) {
            expect(new Color(green).toString()).to.equal("rgba(0,255,0,1)");
            done();
        });

        it("throws an exception", function(done) {
            expect(new Color(blue)).to.throw(Error);
            done();
        });

    });
/*
    describe("RGB to Hex conversion", function() {
    });
*/
});