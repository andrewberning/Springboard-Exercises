const $searchInput = $("#gif-input");
const $gifsContainer = $("#gifs-container");

/* handle form submission */

$("form").on("submit", async function (e) {
  e.preventDefault();

  let query = $searchInput.val();
  $searchInput.val("");

  const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: query,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });

  createAndAddGif(res.data);
});

/* use result to create and add new gif */

function createAndAddGif(res) {
  let numOfResults = res.data.length;
  if (numOfResults) {
    let randomIndex = Math.floor(Math.random() * numOfResults);
    let $newDiv = $("<div class='gif-container'></div>");
    let $newGif = $("<img>", { src: res.data[randomIndex].images.original.url });

    $newDiv.append($newGif);
    $gifsContainer.append($newDiv);
  }
}

/* Remove all Gifs */
$("#remove-btn").on("click", function () {
  $gifsContainer.empty();
})