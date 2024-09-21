const units = {
  gal: ["gallons", "L", 3.78541],
  L: ["liters", "gal", 0.264172],
  lbs: ["pounds", "kg", 0.453592],
  kg: ["kilograms", "lbs", 2.204624],
  mi: ["miles", "km", 1.60934],
  km: ["kilometers", "mi", 0.621373],
};

function FractionStrToDecimal(str) {
  return str.split("/").reduce((p, c) => p / c);
}

function ConvertHandler() {
  // Obtener el número (o convertir fracciones si es necesario)
  this.getNum = function (input) {
    if (input.search(/^\/|\/$|(\/)(?=.*\1)/) !== -1) {
      return "invalid number";
    } else if (input.search(/[^\/](\/)/) !== -1) {
      input = FractionStrToDecimal(input.replace(/[a-zA-Z]/g, ""));
    } else if (isNaN(parseFloat(input))) {
      input = 1; // Si no hay número, por defecto es 1
    } else {
      input = Number.parseFloat(input);
    }
    return input;
  };

  // Obtener la unidad
  this.getUnit = function (input) {
    let unit = input.substring(input.search(/[a-zA-Z]/)).toLowerCase();
    if (unit === "l") {
      unit = unit.toUpperCase();
    }
    return units[unit] !== undefined ? unit : undefined;
  };

  // Obtener la unidad de retorno
  this.getReturnUnit = function (initUnit) {
    if (!initUnit) return undefined;
    initUnit = initUnit.toLowerCase();
    if (initUnit === "l") {
      initUnit = initUnit.toUpperCase();
    }
    return units[initUnit] ? units[initUnit][1] : undefined;
  };

  // Deletrear la unidad (nombre completo)
  this.spellOutUnit = function (unit) {
    if (!unit) return undefined;
    unit = unit.toLowerCase();
    if (unit === "l") {
      unit = unit.toUpperCase();
    }
    return units[unit] ? units[unit][0] : undefined;
  };

  // Conversión
  this.convert = function (initNum, initUnit) {
    if (!initUnit) return undefined;
    initUnit = initUnit.toLowerCase();
    if (initUnit === "l") {
      initUnit = initUnit.toUpperCase();
    }
    // Realizar la conversión y redondear a 5 decimales
    return units[initUnit]
      ? Number(parseFloat((initNum * units[initUnit][2]).toFixed(5)))
      : undefined;
  };

  // Generar la cadena de resultados
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return (
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      Number(parseFloat(returnNum).toFixed(5)) +
      " " +
      this.spellOutUnit(returnUnit)
    );
  };
}

module.exports = ConvertHandler;
