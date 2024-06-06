/*
  Radix sort is a special sorting algorithm that works on lists of numbers. 
  It never makes comparison between elements, like one is smaller or which one is larger. 
  Rather it exploits the fact that information about the size of a number is encoded in the number of digits, more digits mean a bigger number. 
  It works with bucket with reference to the base of number.
*/


// returns the digit in num at the given place value
// getDigit(12345, 0) // 5
// getDigit(12345, 3) // 2
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// returns the number of digits in num
// digitCount(1234) // 4
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// returns the number of digits in the largest numbers in the list from a given array of numbers
// mostDigits([1234,56,7]) // 4
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

// Define a function that accepts list of numbers
function radixSort(nums) {
  // Figure out how many digits the largest number has
  let maxDigitCount = mostDigits(nums);

  // Loop from k=0 up to the largest number of digits
  for (let k = 0; k < maxDigitCount; k++) {
    // For each iteration of the loop:
    // 1. create buckets for each digit (0 to 9)
    let digitBuckets = Array.from({length: 10}, () => []);
    
    // 2. place each number in the corresponding bucket based on its kth digit.
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    // Replace our existing array with values in our buckets, starting with 0 and going up to 9.
    nums = [].concat(...digitBuckets);
  }
  // Return list at the end.
  return nums;
}


module.exports = { getDigit, digitCount, mostDigits, radixSort };