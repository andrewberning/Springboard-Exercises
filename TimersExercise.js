// Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log “DONE!” and stop.

function countDown(num) { // create function called countdown that accepts a number
  const timer = setInterval(function () { // create a timer variable to start an interval
    num--; // decrement the number
    if (num > 0) { // if the number is greater than 0,
      console.log(num); // log the number
    } else {
      clearInterval(timer); // clear interval
      console.log("DONE!"); // console.log 'DONE!'
    }
  }, 1000)
}




// Write a function called randomGame that selects a random number between 0 and 1 every 1000 milliseconds and each time that a random number is picked, add 1 to a counter.If the number is greater than .75, stop the timer and console.log the number of tries it took before we found a number greater than .75.

function randomGame() {
  let count = 0; // create a variable to store the number of attempts

  const timer = setInterval(function () {
    const randomNumber = Math.random(); // get a random number
    count++; // increment count by 1
    if (randomNumber > .75) { // if the randomNumber is greater than .75
      clearInterval(timer); // clear iterval
      count > 1 ? console.log(`It took ${count} tries`) : console.log(`It took ${count} try`); // log the number of try/tries it took before getting a random number greater than .75
    }
  }, 1000)
}
