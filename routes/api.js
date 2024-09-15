"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Manejo de errores: si ambos son inválidos
    if (initNum === "invalid number" && initUnit === undefined) {
      return res.json("invalid number and unit");
    }

    // Si solo el número es inválido
    if (initNum === "invalid number") {
      return res.json("invalid number");
    }

    // Si solo la unidad es inválida
    if (initUnit === undefined) {
      return res.json("invalid unit");
    }

    // Si ambos son válidos, proceder con la conversión
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spellInitUnit = convertHandler.spellOutUnit(initUnit);
    let spellReturnUnit = convertHandler.spellOutUnit(returnUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    );

    let responseObject = {};
    responseObject["initNum"] = initNum;
    responseObject["initUnit"] = initUnit;
    responseObject["returnNum"] = returnNum;
    responseObject["returnUnit"] = returnUnit;
    responseObject["string"] = toString;

    res.json(responseObject);
  });
};
