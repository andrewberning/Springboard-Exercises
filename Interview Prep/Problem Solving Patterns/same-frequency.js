/*
**sameFrequency**

Write a function called ***sameFrequency***. Given two positive integers, find out if the two numbers have the same frequency of digits.

Examples:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
*/

function freqCounter(str) {
  let charCount = {};
  for (let char of str) {
    charCount[char] = charCount[char] + 1 || 1;
  }
  return charCount;
}

function sameFrequency(num1, num2) {
  let str1 = num1.toString();
  let str2 = num2.toString();
  if (str1.length !== str2.length) return false;

  let count1 = freqCounter(str1);
  let count2 = freqCounter(str2);

  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }

  return true;
}

console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(22,222)); // false
