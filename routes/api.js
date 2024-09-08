'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res){
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit){
      res.send('invalid number and unit');
      return;
    }else if (initNum === 'invalid number') {
      res.send('number');
      return;
    }else if (initUnit === 'invalid unit') {
      res.send('unit');
      return;
    }
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returUnit);

      res.json({ initNum, initUnit, returnNum, returUnit, string: toString });
    
  })

};
