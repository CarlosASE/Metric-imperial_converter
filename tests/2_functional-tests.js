const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

describe("Functional Tests", function () {
  describe("Routing Tests", function () {
    describe("GET /api/convert => conversion object", function () {
      // Test 1: Convert 10L (valid input)
      it("Convert 10L (valid input)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, "L");
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, "gal");
            done();
          });
      });

      // Test 2: Convert 32g (invalid input unit)
      it("Convert 32g (invalid input unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid unit");
            done();
          });
      });

      // Test 3: Convert 3/7.2/4kg (invalid number)
      it("Convert 3/7.2/4kg (invalid number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid number");
            done();
          });
      });

      // Test 4: Convert 3/7.2/4kilomegagram (invalid number and unit)
      it("Convert 3/7.2/4kilomegagram (invalid number and unit)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "invalid number and unit");
            done();
          });
      });

      // Test 5: Convert kg (no number)
      it("Convert kg (no number)", function (done) {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, "kg");
            assert.approximately(res.body.returnNum, 2.20462, 0.1);
            assert.equal(res.body.returnUnit, "lbs");
            done();
          });
      });
    });
  });
});
