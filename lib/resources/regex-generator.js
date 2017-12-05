const fs = require("fs");

class Node {
  constructor(value, parent, terminator = false, root = false) {
    this.value = value;
    this.parent = parent;
    this.children = [];
    this.uncategorisedChildren = [];
    this.leaf = terminator; // defaults to being a branch node
    this.root = root;
  }
}

class Tree {
  constructor(array) {
    this.rootNode = new Node(null, null, false, true);
    this.rootNode.uncategorisedChildren = array;
    resolveNode(this.rootNode);
  }
}

function separateMatches(prefix, stringArray) {
  let matches = [];
  let nonMatches = [];
  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i].startsWith(prefix)) {
      matches.push(stringArray[i]);
    } else {
      nonMatches.push(stringArray[i]);
    }
  }
  return {
    matches,
    nonMatches
  };
}

function removeStartingCharacters(prefix, stringArray) {
  let modifiedArray = [];
  for (let i = 0; i < stringArray.length; i++) {
    if (!(stringArray[i].startsWith(prefix))) {
      throw "not every element begins with this prefix!";
    }
  }

  let length = prefix.length;
  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i].length === length) {
      // console.log("do something");
    }
    modifiedArray.push(stringArray[i].slice(length));
  }
  return modifiedArray;
}

function popGreatestCommonPrefix(stringArray) { // assumes no empty values
  let prefix = stringArray[0];

  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i] === "") {
      throw "there shouldn't be an empty value here...";
    }
    if (stringArray[i].startsWith(prefix)) {
      continue;
    } else {
      for (let j = Math.min(prefix.length, stringArray[i].length); j > 0; j--) {
        prefix = prefix.slice(0, j);
        if (stringArray[i].startsWith(prefix)) {
          break;
        }
      }
    }
  }

  let modifiedArray = removeStartingCharacters(prefix, stringArray);

  return {
    prefix,
    modifiedArray
  };
}

function resolveNode(node) {
  if (node.uncategorisedChildren.length === 0) {
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        resolveNode(node.children[i]);
      }
    } else {
      node.leaf = true; // this is a leaf if it has no children
    }
  } else {
    node.uncategorisedChildren = node.uncategorisedChildren.filter((value) => {
      if (value === "") {
        node.leaf = true;
      } else {
        return value;
      }
    });

    if (node.uncategorisedChildren.length === 1) { // seems redundant if next step set up properly
      node.children.push(
        new Node(node.uncategorisedChildren[0], node)
      );
      node.uncategorisedChildren.pop(0);
      resolveNode(node);
    } else if (node.uncategorisedChildren.length > 1) {
      let prefix = getInitialPrefix(node.uncategorisedChildren);
      let sortedMatches = separateMatches(prefix, node.uncategorisedChildren);

      let matches = popGreatestCommonPrefix(sortedMatches.matches);
      let newNode = new Node(matches.prefix, node);
      newNode.uncategorisedChildren = matches.modifiedArray;
      node.children.push(newNode);

      node.uncategorisedChildren = sortedMatches.nonMatches;
      resolveNode(node);
    }
  }
}

function getInitialPrefix(array) { // assumes no empty values
  if (array.length < 1) {
    throw "array too short";
  }
  let prefix = array[0][0];
  if (prefix === "\\") {
    prefix = array[0].substring(0, 1);
  } // get the next slash as well
  return prefix;
}

function regexify(node) {
  let regexString = "";
  if (!node.root) {
    regexString = node.value;
  }
  let regexArray = [];
  if (node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      regexArray.push(regexify(node.children[i]));
    }
    regexString = regexString + "(" + regexArray.join("|") + ")";

    if (node.leaf === true && node.root === false) {
      regexString = regexString.concat("?");
    }
  }
  return regexString;
}

fs.readFile("primitives.txt", "utf-8", (err, data) => {
  primitivesArray = data.split(/\s+/);
  for (let i = 0; i < primitivesArray.length; i++) {
    primitivesArray[i].trim();
  }
  let primitivesTree = new Tree(primitivesArray);
  primitivesTree.rootNode.value = "";
  let primitivesRegex = regexify(primitivesTree.rootNode);
  /* Note: You need to clean up any special primitives that need to be be escaped (eg. `\ `; the space primitive) */
  console.log(primitivesRegex);

  fs.writeFile('primitivesRegex.txt', primitivesRegex, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
