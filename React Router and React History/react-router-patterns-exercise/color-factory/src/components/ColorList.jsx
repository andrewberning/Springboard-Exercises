import {Link} from "react-router-dom";
import './ColorList.css'

export default function ColorList({ colors }) {
  return (
    <div className="ColorList">
      <div className="ColorList-container">
        <h2>Please select a color.</h2>
      </div>
      <div className="ColorList-container">
        {colors.map((color) => (
          <div key={color.name} className="ColorList-link">
            <Link to={`/colors/${color.name}`}>{color.name}</Link>
          </div>
        ))}
      </div>

    </div>

  )
}