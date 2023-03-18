const CalculatorClass = require("./CalculatorClass");
const { operator, numbers } = require("./fetchData");

// instance --> calculator
// toInstanciate
const calculator = new CalculatorClass(operator, numbers);

// console.log(calculator.calculate(operator, numbers));

console.log(calculator.init());
