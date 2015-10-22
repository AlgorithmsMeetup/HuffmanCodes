// Given a Huffman tree and a string, encode that string into a new string
// consisting only of 1s and 0s, using the code given by the tree.
var encodeString = function(input, huffman) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    var currentNode = huffman;
    var nextCharacter = input[i];
    while (currentNode.val.length > 1) {
      if (currentNode.left.val.indexOf(nextCharacter) !== -1) {
        currentNode = currentNode.left;
        output += "0";
      } else if (currentNode.right.val.indexOf(nextCharacter) !== -1) {
        currentNode = currentNode.right;
        output += "1";
      } else {
        throw new Error("Character " + nextCharacter + " is not in this Huffman tree.");
      }
    }
  }
  return output;
};

// Given a Huffman tree and a string of 1s and 0s, decode that string into
// a new, human-readable string, using the code given by the tree.
var decodeString = function(input, huffman) {
  var output = "";
  var currNode = huffman;
  for (var currIdx = 0; currIdx < input.length; currIdx++) {
    var currBit = input[currIdx];
    if (currBit === "0") {
      currNode = currNode.left;
    } else if (currBit === "1") {
      currNode = currNode.right;
    }
    if (currNode.val.length === 1) {
      output += currNode.val[0];
      currNode = huffman;
    }
  }
  return output;
};

// Given a corpus of text, return a Huffman tree that represents the
// frequencies of characters in the corpus.
//
// You should use the `PriorityQueue` class that is provided in the
// file `priorityQueue.js`.  The relevant methods are .insert(key, val),
// which inserts a value with the given key into the queue, and
// .extract(), which returns the {key: key, val: val} pair with the lowest
// key priority.
//
// You may also use the `Tree` class that is provided in the file `misc.js`
// Some corpuses are included as the variables `lorumIpsum` and `declaration`.
var makeHuffmanTree = function(corpus) {
  var charCounts = countChars(corpus);
  var pq = new PriorityQueue();
  for (var c in charCounts) {
    var n = charCounts[c];
    var tree = new Tree([c]);
    pq.insert(n, tree);
  }

  while (pq.size() > 1) {
    var first = pq.extract();
    var second = pq.extract();

    var tree1 = first.val;
    var tree2 = second.val;

    var key1 = first.key;
    var key2 = second.key;

    var newTree = new Tree(tree1.val.concat(tree2.val));
    newTree.left = tree1;
    newTree.right = tree2;
    pq.insert(key1+key2, newTree);
  }

  return pq.extract().val;
};

var countChars = function(input) {
  var counts = {};
  for (var i = 0; i < input.length; i++) {
    var c = input[i];
    counts[c] = counts[c] || 0;
    counts[c]++;
  }
  return counts;
};
