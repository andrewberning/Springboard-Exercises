/*
  Selection sort works by starting with the first index of an array and compare it to all other elements in the array to find the smallest (or largest) value in the array. If found, we swap that value with the beginning value. We repeat this process on each value in the array until the array becomes sorted.
*/

// Define a function that accepts a list of numbers
function selectionSort(arr) {
  // swaps numbers in the array
  const swap = (arr, idx1, idx2) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

  // Loop from i=0 up to the length of the array
  for (let i = 0; i < arr.length; i++) {
    // make lowest the first idx of array
    let lowest = i;
    
    // loop from j=i+1 to length of array
    for (let j = i + 1; j < arr.length; j++) {
      // if first elemetn of array > next element, change lowest to j
      if (arr[lowest] > arr[j]) {
        lowest = j;
        console.log(`lowest is now: ${lowest}`);
      }
    }

    // if i !== lowest, swap the elements
    if (i !== lowest) swap(arr, i, lowest);
  }

  // Return list at the end.
  return arr;
}


module.exports = selectionSort;