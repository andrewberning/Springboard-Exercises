import { useEffect, useRef, useState } from "react"
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default function Decktwo() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const timerId = useRef();

  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      const res = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(res.data);
    }
    fetchData();
  }, [setDeck]);

  useEffect(function autoDraw() {
    async function draw() {
      try {
        const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

        if (drawRes.data.remaining === 0) {
          throw new Error("DECK IS EMPTY!");
        }

        const card = drawRes.data.cards[0];

        setDrawn(data => [
          ...data, 
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image,
          },
        ]);
      } catch (err) {
        setIsDrawing(false);
        alert(err);
      }
    }   

    if (isDrawing && !timerId.current) {
      timerId.current = setInterval(draw, 200);
    } else if (!isDrawing && timerId.current) {
      stopDrawingCards()
    }

    function stopDrawingCards() {
      if (timerId.current) clearInterval(timerId.current);
      timerId.current = null;
    }

    return stopDrawingCards
  }, [isDrawing, deck])

  useEffect(function shuffleDeckViaAPI () {
    async function startShuffling(deck) {
      try {
        await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
        setDrawn([]);
        setIsDrawing(false);
        setIsShuffling(false);
      } catch (err) {
        alert(err);
      }
    }  
    
    if(isShuffling && deck) startShuffling(deck);
  }, [isShuffling, deck])


  function toggleDrawing() {
    setIsDrawing(auto => !auto);
  }

  function startShuffling() {
    return setIsShuffling(true);
  }

  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button
        className="Deck-gimme"
        onClick={toggleDrawing}
        disabled={isShuffling}>
        {isDrawing ? "STOP " : "KEEP "} DRAWING
      </button>
    );
  }

  function renderShuffleBtnIfOk() {
    if (!deck) return null;

    return (
      <button
      className="Deck-gimme"
      onClick={startShuffling}
      disabled={isShuffling}>
      SHUFFLE DECK
      </button>
    );
  }

  return (
    <main className="Deck">

      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}
      
      <div className="Deck-cardarea">
        {drawn.map(card => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}