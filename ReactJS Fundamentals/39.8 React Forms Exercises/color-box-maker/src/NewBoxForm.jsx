import React, {useState} from 'react'
import { v4 as uuid } from 'uuid';
import './NewBoxForm.css'

function NewBoxForm({ addBox }) {
  const [formData, setFormData] = useState({
    width: "",
    height: "",
    color: "",
  });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addBox({ ...formData, id: uuid() })
    setFormData({width: "", height: "", color: "",});
  };

  return (
    <div>
      <h3>NewBoxForm Component</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='width'>Width: </label>
          <input 
          id='width' 
          type="text" 
          name='width'
          value={formData.width} 
          onChange={handleChange} 
          />
          <label htmlFor='height'>Height: </label>
          <input 
          id='height' 
          type="text" 
          name='height'
          value={formData.height}
          onChange={handleChange}
          />
          <label htmlFor='color'>Background Color: </label>
          <input 
          id='color' 
          type="text" 
          name='color'
          value={formData.color}
          onChange={handleChange}
          />
        </div>
        <button>Add Color Box</button>
      </form>
    </div>
  );
}

export default NewBoxForm