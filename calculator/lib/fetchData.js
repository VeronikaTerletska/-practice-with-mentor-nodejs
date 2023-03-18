const [operator, ...args] = process.argv.slice(2);
const numbers = args.map(element => Number(element));

module.exports = {
  operator,
  numbers,
};
