let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1. Make request to the Numbers API to get a fact about your favorite number. Be sure to gt back JSON by including the json query key, specific to this API.
async function part1() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data)
}
part1();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
const favNumbers = [7, 11, 22];
async function part2() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
part2();


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, puth them on the page. Repeats are okay.
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $("body").append(`<p>${data.text}</p>`)
  });
}
part3();