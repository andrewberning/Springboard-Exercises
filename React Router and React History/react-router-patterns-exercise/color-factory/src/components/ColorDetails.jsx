import { Link, Navigate } from 'react-router-dom';
import './ColorDetails.css'

export default function ColorDetails({ color }) {
  if(!color) return <Navigate to="/colors" />

  return (
    <div className='ColorDetails' style={{ backgroundColor: color.hex }}>
      <div className='ColorDetails-container'>
        <p>THIS IS {color.name.toUpperCase()}.</p>
        <p>IS IT NOT BEAUTIFUL?</p>
        <Link to="/">GO BACK</Link>
      </div>
    </div>
  );
}