let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1. Make request to the Numbers API to get a fact about your favorite number. Be sure to gt back JSON by including the json query key, specific to this API.
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data);
});


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, puth them on the page. Repeats are okay.

Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});