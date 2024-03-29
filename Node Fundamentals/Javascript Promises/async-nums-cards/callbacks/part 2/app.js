$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

  $.getJSON(`${baseURL}/new/draw`, function(data) {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  })

  // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck. 
  // Once you have both cards, ***console.log*** the values and suits of both cards.

  $.getJSON(`${baseURL}/new/draw`, function(data) {
    console.log(data);
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    let deck_id = data.deck_id;
    $.getJSON(`${baseURL}/${deck_id}/draw`, function(data) {
      console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    });
  });

  // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');

  $.getJSON(`${baseURL}/new/shuffle`, function(data) {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });

});