class CalculatorClass {
  constructor(operator, numbers) {
    this.operator = operator;
    this.numbers = numbers;
  }

  calculate = (op, numArray) => {
    let result = null;

    switch (op) {
      case "sum":
        result = numArray.reduce((acc, el) => acc + el);
        break;

      case "sub":
        result = numArray.reduce((acc, el) => acc - el);
        break;

      case "mult":
        result = numArray.reduce((acc, el) => acc * el);
        break;

      case "div":
        result = numArray.reduce((acc, el) => acc / el);
        break;

      default:
        result = "Unknown operation type";
        break;
    }

    return result;
  };

  init = () => {
    return this.calculate(this.operator, this.numbers);
  };
}

module.exports = CalculatorClass;
