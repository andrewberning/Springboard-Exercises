/** POKEGAME
 * should take list of 8 pokemon and randomly assign them into two hands of 4 cards each.
 * Should render two Pokedex components, one for each hand
 * 
 * Modify Pokegame so it calculates the total experience for each hand of pokemon. 
 * It should pass this total to the Pokedex.
 * 
 * Have Pokegame component determine which hand is the winner, where the winning hand is the one with the higher total experience.
 * 
 * Modify the Pokedex component one more time so that it accepts a prop of isWinner.
 * If the Pokedex is the winning one, it should display the message "THIS HAND WINS!" at the bottom of the deck.
 * 
 * After page load, it should show two different hands with a randomly changing winner every time page refreshes.
 */
import React from "react";
import Pokedex from "./Pokedex";

function Pokegame(props) {
  let hand1 = [];
  let hand2 = [...props.pokemon];

  while (hand1.length < hand2.length) {
    let randIdx = Math.floor(Math.random() * hand2.length);
    let randPokemon = hand2.splice(randIdx, 1)[0];
    hand1.push(randPokemon);
  }

  let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
  let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

  return (
    <>
      <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} />
      <Pokedex pokemon={hand2} exp={exp2} isWinner={exp2 > exp1} />
    </>
  )
}

Pokegame.defaultProps = {
  pokemon: [
    { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
    { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
    { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
    { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
    { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
    { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
    { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
    { id: 133, name: "Eevee", type: "normal", base_experience: 65 }
  ]
};

export default Pokegame;