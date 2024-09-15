const units = {
  'gal': ['gallons', 'L', 3.78541],
  'L': ['liters', 'gal', 0.264172],
  'lbs': ['pounds', 'kg', 0.453592],
  'kg': ['kilograms', 'lbs', 2.204624],
  'mi': ['miles', 'km', 1.60934],
  'km': ['kilometers', 'mi', 0.621373]
};

function FractionStrToDecimal(str) {
  return str.split('/').reduce((p, c) => p / c);
}

function ConvertHandler() {

  this.getNum = function (input) {
    if (input.search(/^\/|\/$|(\/)(?=.*\1)/) !== -1) {
      // Devuelve 'invalid number' si el input es inválido
      return 'invalid number';
    } else if (input.search(/[^\/](\/)/) !== -1) {
      // Convertir fracción a decimal
      input = FractionStrToDecimal(input.replace(/[a-zA-Z]/g, ''));
    } else if (isNaN(parseFloat(input))) {
      // Establece en 1 si no hay número en el input
      input = 1;
    } else {
      input = Number.parseFloat(input);
    }

    return input;
  };

  this.getUnit = function (input) {
    var unit = input.substring(input.search(/[a-zA-Z]/)).toLowerCase();

    if (unit === 'l') {
      unit = unit.toUpperCase();
    }

    return (units[unit] !== undefined ? unit : undefined);
  };

  this.getReturnUnit = function (initUnit) {
    if (!initUnit) return undefined; // Verifica si initUnit es undefined

    initUnit = initUnit.toLowerCase();
    if (initUnit === 'l') {
      initUnit = initUnit.toUpperCase();
    }

    return units[initUnit] ? units[initUnit][1] : undefined; // Verificación final
  };

  this.spellOutUnit = function (unit) {
    if (!unit) return undefined; // Verifica si unit es undefined

    unit = unit.toLowerCase();
    if (unit === 'l') {
      unit = unit.toUpperCase();
    }

    return units[unit] ? units[unit][0] : undefined; // Verificación final
  };

  this.convert = function (initNum, initUnit) {
    if (!initUnit) return undefined; // Verifica si initUnit es undefined

    initUnit = initUnit.toLowerCase();
    if (initUnit === 'l') {
      initUnit = initUnit.toUpperCase();
    }

    return units[initUnit] ? Number.parseFloat((initNum * units[initUnit][2]).toFixed(5)) : undefined; // Verificación final
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + Number.parseFloat(returnNum).toFixed(5) + ' ' + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;
