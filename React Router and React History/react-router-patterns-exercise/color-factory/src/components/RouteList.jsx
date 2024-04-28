import { Routes, Route, Navigate } from 'react-router-dom';
import ColorFactory from './ColorFactory';
import NewColorForm from './NewColorForm';
import FilterColorDetails from './FilterColorDetails';

export default function RouteList({ colors, addColor }) {
  return (
    <Routes>
      <Route path='/colors' element={<ColorFactory colors={colors} />} />
      <Route path='/colors/:color' element={<FilterColorDetails colors={colors} />} />
      <Route path='/colors/new' element={<NewColorForm addColor={addColor} />} ></Route>
      <Route path='/*' element={<Navigate to='/colors' />} />
    </Routes>
  )
}