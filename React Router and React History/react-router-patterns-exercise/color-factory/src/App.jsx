import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteList from './components/RouteList'


import './App.css'

function App() {
  const [colors, setColors] = useState([
    {name: 'red', hex: '#ff0000'}
  ]);
  const addColor = colorObj => {
    setColors(colors => [...colors, colorObj])
  }
  return (
    <div>
      <BrowserRouter>
        <div>
          <RouteList colors={colors} addColor={addColor} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
