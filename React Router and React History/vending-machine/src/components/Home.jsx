import { Link } from "react-router-dom"


export default function Home() {
  return (
    <div className="Home container">
      <h1>Thank for coming to our wonderful vending machine!</h1>
      <h2>Please select an item</h2>
      <Link to="/soda" className="link">SODA</Link>
      {/* <br /> */}
      <Link to="/candy" className="link">CANDY</Link>
      {/* <br /> */}
      <Link to="/chips" className="link">CHIPS</Link>
    </div>
  )
}