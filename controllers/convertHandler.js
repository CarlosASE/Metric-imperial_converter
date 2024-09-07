

function ConvertHandler() {
  
  this.getNum = function(input) {    
    return Number(input);
  };
  
  this.getUnit = function(input) {
    const units = {
      gal: "gal",
      lbs: "lbs",
      mi: "mi",
      l: "l",
      kg: "kg",
      km: "km"
    }    
    return units[unit];
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit =  initUnit.toLowerCase();    
    return {
      gal: "L",
      lbs: "kg",
      mi: "km",
      l: "gal",
      km: "mi",      
    }[initUnit];
  };

  this.spellOutUnit = function(unit) {    
    return {
      gal: "gallon", 
      lbs: "pound",
      mi: "mile",
      l: "liter",
      kg: "kilogram",
      km: "kilometer",
    }[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowercase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;        
    }    
    return Number(XPathResult.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
