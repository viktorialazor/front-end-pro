import React from 'react';
import Name from './Name.js';
import FavoriteAnimal from './FavoriteAnimal.js';
import Display from './Display.js';

export default function App() {
  const [animal, setAnimal] = React.useState('');
  
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      <Display animal={animal} />
    </form>
  )
};
