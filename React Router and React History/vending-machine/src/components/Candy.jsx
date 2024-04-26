import { Link } from "react-router-dom"

export default function Candy() {
  return (
    <div className="Candy container">
      <h2>CANDY! MY FAVORITE!</h2>
      <Link to="/" className="link">GO BACK</Link>
    </div>
  )
}