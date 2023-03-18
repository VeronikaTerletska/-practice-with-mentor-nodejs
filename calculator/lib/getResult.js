const calculator = (op, numArray) => {
  let result = null;
  // reduce по дефолту бере 0 індекс масиву
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

// console.log(calculate(operator, numbers));

module.exports = calculator;
