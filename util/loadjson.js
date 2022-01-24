const fs = require('fs');

module.exports = function (filename) {
  const data = fs.readFileSync(filename, "utf8");
  return JSON.parse(data);
}