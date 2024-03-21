// Question 2 - First Variation on Caesar Cipher
// The action of a Caesar cipher is to replace each plaintext letter (plaintext letters are from 'a' to 'z' or from 'A' to 'Z') with a different one a fixed
// number of places up or down the alphabet.
// This program performs a variation of the Caesar shift. The shift increases by 1 for each character (on each iteration).
// If the shift is initially 1, the first character of the message to be encoded will be shifted by 1, the second character will be shifted by 2, etc...

// The function "movingShift" first codes the entire string and then returns an array of strings containing the coded string in 5 parts (five parts
// because, to avoid more risks, the coded message will be given to five runners, one piece for each runner).

function movingShift(s, shift) {
  // Function to shift a character by the given shift value
  function shiftChar(char, shift) {
    if (char.match(/[a-zA-Z]/)) {
      // Determine whether the character is uppercase or lowercase
      let base =
        char === char.toUpperCase() ? "A".charCodeAt(0) : "a".charCodeAt(0);

      // Shift the character while maintaining its case
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shift) % 26) + base
      );
    } else {
      return char;
    }
  }

  // Code the entire string by shifting each character
  let codedString = "";
  for (let i = 0; i < s.length; i++) {
    codedString += shiftChar(s[i], shift + i);
  }

  // Determine the lengths of the five parts
  let length = codedString.length;
  let partLengths = Array(5).fill(Math.floor(length / 5));
  let remainder = length % 5;

  // Adjust the lengths if the string cannot be evenly divided
  for (let i = 0; i < remainder; i++) {
    partLengths[i]++;
  }

  // Divide the string into five parts
  let parts = [];
  let index = 0;
  for (let i = 0; i < 5; i++) {
    parts.push(codedString.substr(index, partLengths[i]));
    index += partLengths[i];
  }

  return parts;
}

let result = movingShift("Hello, World!", 1);
console.log(result);
