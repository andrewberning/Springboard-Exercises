import './Pokecard.css';

const POKE_API = 'https://raw.githubusercontent.com/' +
  'PokeAPI/sprites/master/sprites/pokemon/';

function Pokecard(props) {
  let imgSrc = `${POKE_API}${props.id}.png`;

  return (
    <div className='Pokecard'>
      <h4 className='Pokecard-title'>{props.name}</h4>
      <img className='Pokecar-image' src={imgSrc} alt={props.name} />
      <h4 className='Pokecard-type'>Type: {props.type}</h4>
      <h4 className='Pokecard-data'>EXP: {props.exp}</h4>
    </div>
  )
}

export default Pokecard