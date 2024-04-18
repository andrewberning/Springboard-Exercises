import React from 'react';
import './Box.css';

function Box({ 
  id, 
  width = 5, 
  height = 5, 
  color = 'blue', 
  handleRemove 
}) {
  const remove = () => handleRemove(id);

  return (
    <div>
      <div 
      className='Box'
      style={{ 
        width : `${width}em`, 
        height : `${height}em`, 
        backgroundColor: color 
      }}
      data-testid="box">
      </div>
      <button onClick={remove}>X</button>
    </div>
  );
}

export default Box;