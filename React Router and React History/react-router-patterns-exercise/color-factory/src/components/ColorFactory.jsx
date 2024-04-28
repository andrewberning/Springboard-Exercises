import { Link } from 'react-router-dom'
import ColorList from './ColorList';
import './ColorFactory.css'

export default function ColorFactory({ colors }) {
  return (
    <div className='ColorFactory'>
      <div className='NewColorForm-container'>
        <h1>Welcome to the Color Factory</h1>
        <Link to="/colors/new" >Add a color.</Link>
      </div>
      <ColorList colors={colors} />


    </div>
  )
}