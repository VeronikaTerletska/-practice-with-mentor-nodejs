const [operator, ...args] = process.argv.slice(2);
const numbers = args.map(el => Number(el));

module.exports = { operator, numbers };
