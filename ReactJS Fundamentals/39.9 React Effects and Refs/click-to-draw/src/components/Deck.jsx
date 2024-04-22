import { useEffect, useRef, useState } from "react"
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

export default function Deck() {
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
  }, [])

    useEffect(function autoDraw() {
      if (isDrawing) {
        timerId.current = setInterval(() => {
          draw()
        }, 200)

        return () => {
          clearInterval(timerId.current)
        }
      }
    }, [isDrawing])

  async function draw() {
    try {
      const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

      if (drawRes.data.remaining === 0) {
        setIsDrawing(false);
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
      alert(err);
    }
  }

  function startDrawing() {
    setIsDrawing(true);
  }

    function stopDrawing() {
    setIsDrawing(false);
  }

  async function startShuffling() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  function renderDrawBtnIfOk() {
    if (!deck) return null;

    return (
      <button
        className="Deck-gimme"
        onClick={draw}
        disabled={isShuffling}>
        DRAW
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

  function renderStartDrawingBtnIfOk() {
    if (!deck) return null;
    if (isDrawing) return null;

    return (
      <button
        className="Deck-gimme"
        onClick={startDrawing}
        disabled={isShuffling}>
        AUTO DRAW
      </button>
    );
  }

  function renderStopDrawingBtnIfOk() {
    if (!deck) return null;
    if (!isDrawing) return null;

    return (
      <button
        className="Deck-gimme"
        onClick={stopDrawing}
        disabled={isShuffling}>
        STOP AUTO DRAW
      </button>
    );
  }

  return (
    <main className="Deck">

      {renderDrawBtnIfOk()}
      {renderShuffleBtnIfOk()}
      {renderStartDrawingBtnIfOk()}
      {renderStopDrawingBtnIfOk()}
      
      <div className="Deck-cardarea">
        {drawn.map(card => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  )
}