import { Link } from "react-router-dom"

export default function Chips() {
  return (
    <div className="Chips container">
      <h2>Chips are good!</h2>
      <Link to="/" className="link">GO BACK</Link>
    </div>
  )
}