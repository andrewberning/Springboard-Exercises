/*
**constructNote**

Write a function called ***constructNote***, which accepts two strings, a message and some letters. The function should return ***true*** if the message can be built with the letters that you are given; otherwise, it should return ***false***.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

**Examples**:

constructNote('aa', 'abc') // false
constructNote('abc', 'dcba') // true
constructNote('aabbcc', 'bcabcaddff') // true

**Constraints**:

Time Complexity: O(M + N) - If M is the length of message and N is the length of letters:

add whatever parameters you deem necessary
*/

function freqCounter(str) {
  let charCount = {};
  for (let char of str) {
    charCount[char] = charCount[char] + 1 || 1;
  }
  return charCount;
}

function constructNote(msg, letters) {
  let msgFreqs = freqCounter(msg);
  let lettersFreqs = freqCounter(letters);

  console.log(msgFreqs, lettersFreqs);
  for (let char in msgFreqs) {
    if (!lettersFreqs[char]) {
      return false;
    }
    if (msgFreqs[char] > lettersFreqs[char]) {
      return false
    }
  }

  return true;  
}
