import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './NewColorForm.css'

export default function NewColorForm({ addColor }) {
  const [formData, setFormData] = useState({
    name: "",
    hex: ""
  });

  const navigate = useNavigate();

  const handleChange =(evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addColor({ ...formData })
    setFormData({name: "", hex: ""});
    navigate("/");
  }

  return (
    <div className="NewColorForm">
      <form className="NewColorForm-form" onSubmit={handleSubmit}>
      <div className="container">
        <label htmlFor="name">Color Name: </label>
        <input id="name" type="text" name="name" value={formData.name} placeholder="choose a color name" onChange={handleChange} />
      </div>
      <div className="container">
        <label htmlFor="hex">Color Value: </label>
        <input id="hex" type="color" name="hex" value={formData.hex} onChange={handleChange} />
      </div>
      <div className="container">
        <button>Add Color!</button>
      </div>
    </form>
    </div>
  )
}