import { Link } from "react-router-dom"

export default function Soda() {
  return (
    <div className="Soda container">
      <h2>mmmm...Soda. Fizzy goodness!</h2>
      <Link to="/" className="link">GO BACK</Link>
    </div>
  )
}