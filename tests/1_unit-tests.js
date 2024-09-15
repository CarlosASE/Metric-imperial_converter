const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
  describe("Function convertHandler.getNum(input)", function () {
    it("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    it("Decimal Input", function (done) {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    it("Fractional Input", function (done) {
      let input = "32/3L";
      assert.equal(convertHandler.getNum(input), 32 / 3);
      done();
    });

    it("Fractional Input w/ Decimal", function (done) {
      let input = "9/3.3L";
      assert.equal(convertHandler.getNum(input), 9 / 3.3);
      done();
    });

    it("Invalid Input (double fraction)", function (done) {
      let input = "32/3/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    it("No Numerical Input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  describe("Function convertHandler.getUnit(input)", function () {
    it("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });

    it("Unknown Unit Input", function (done) {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  describe("Function convertHandler.getReturnUnit(initUnit)", function () {
    it("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  describe("Function convertHandler.spellOutUnit(unit)", function () {
    it("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  describe("Function convertHandler.convert(num, unit)", function () {
    it("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    it("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    it("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    it("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    it("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    it("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });
  });
});
