var expect = require("chai").expect;
let Color = require("../src/index");

describe("Color from string input", function() {

    describe("From Hex", function() {
        var red = '#f00';
        var green = 'rgb(0,255,0)';
        var blue = 'blue';
        var yellow = '#ff0';

        it("returns the hex color in rgba", function(done) {
            expect(new Color(red).toString()).to.equal("rgba(255,0,0,1)");
            done();
        });

        it("returns the rgb color in rgba", function(done) {
            expect(new Color(green).toString()).to.equal("rgba(0,255,0,1)");
            done();
        });

        it("returns the named color in rgba", function(done) {
            expect(new Color(blue).toString()).to.equal("rgba(0,0,255,1)");
            done();
        });

        it("returns the shorthand hex color in rgba", function(done) {
            expect(new Color(yellow).toString()).to.equal("rgba(255,255,0,1)");
            done();
        });

        it("returns the inverse color in rgba", function(done) {
            expect(new Color(yellow).invert().toString()).to.equal(new Color(blue).toString());
            done();
        });

        it("returns the inverse color in rgba", function(done) {
            expect(new Color(blue).invert().toString()).to.equal(new Color(yellow).toString());
            done();
        });

        it("returns the contrasting color in rgba", function(done) {
            expect(new Color('yellow').contrast(new Color('white')).toString()).to.equal(new Color(0,0,0).toString());
            done();
        });

    });

});