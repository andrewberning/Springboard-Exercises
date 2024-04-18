import React, {useState} from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';
import './BoxList.css';

function BoxList() {
  const [boxes, setBoxes] = useState([])
  const addBox = boxObj => {
    console.log(boxObj);
    setBoxes(boxes => [...boxes, boxObj])
  };
  const removeBox = id => {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  };

  return (
    <>
      <NewBoxForm addBox={addBox} />
      <h3>Box List</h3>
      <div id="boxes-container">
        {boxes.map(box => (
        <Box 
          key={box.id}
          id={box.id}
          width={box.width} 
          height={box.height} 
          color={box.color} 
          handleRemove={removeBox}
        />
      ))}
      </div>

    </>
  )
}

export default BoxList