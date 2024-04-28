import { useParams } from 'react-router-dom'
import ColorDetails from './ColorDetails';

export default function FilterColorDetails({ colors }) {
  const {color} = useParams();

  if (color) {
    const currentColor = colors.find(
      c => c.name.toLowerCase() === color.toLowerCase()
    );
    return <ColorDetails color={currentColor} />
  }
  return null;
}