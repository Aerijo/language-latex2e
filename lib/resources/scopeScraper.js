const fs = require("fs");

var scopesSet = new Set();
var tempArray = [];

fs.readFile("../../grammars/latex.cson", "utf-8", (err, data) => {
  let re = /name:\s*'(.*?)'/g

  while ((tempArray = re.exec(data)) !== null) {
    if (tempArray[1] === "LaTeX2e") { continue; } // skip the user friendly name
    scopesSet.add(tempArray[1]);
  }
  let scopesString = Array.from(scopesSet).sort().join("\n");

  fs.writeFile("scopeList.txt", scopesString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
