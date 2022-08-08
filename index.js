// notes:
// It will find every possible combination of input and return an array of all possible outcomes.
// Use a loop to easily iterate through each combination.
// Use a counter to keep track of the length of a substring.
// Return object.

// ["aabb", "aaaa", "bbab"]
// ['aabb', 'bbab']
// ['aabb', 'bbab', "aaaa"]

longestSubstring = (arr) => {
  let maxCount = 0;
  let runCount = 1;
  let maxChar = "";

  const permutator = (inputArr) => {
    let result = [];

    const permute = (arg, m = []) => {
      // arg: placeholder for the input
      if (arg.length === 0) {
        result.push(m); // m holds the elements -> as it goes through the loop it removes an element
      } else {
        for (let i = 0; i < arg.length; i++) {
          let curr = arg.slice();
          let next = curr.splice(i, 1); // remove 1 element at current index
          permute(curr.slice(), m.concat(next)); // passes a copy of curr, concats next into m -> pushes it into the end of the array -> repeats the loop
        }
      }
    };
    permute(inputArr); // carry the argument -> call permute inside of permutator

    return result;
  };

  let allPermutations = permutator(arr);

  allPermutations.forEach(function (e) {
    let str = e.join(""); //'aaaaaabbbbab'
    let array = str.toLowerCase().split("").join(""); //[ 'a', 'a', 'a', 'a','a', 'a', 'b', 'b','b', 'b', 'a', 'b']
    for (i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        runCount++;
      } else {
        if (runCount > maxCount) {
          maxCount = runCount;
          runCount = 1;
          maxChar = array[i];
        } else {
          runCount = 1;
        }
      }
    }
  });

  let object = { letter: maxChar, length: maxCount };

  return object;
};

console.log(longestSubstring(["aabb", "aaaa", "bbab"]));
// expected results: 'aaaaaabbbbab' letter: 'a', length: 6

// console.log(longestSubstring(["dd", "bb", "cc", "dd"]));
// expected results: 'ddddbbcc' letter: 'd', length: 4

// console.log(longestSubstring(["xxbxx", "xbx", "x"]));
// expected results: 'xxbxxxxbx' "letter": "x","length": 4
