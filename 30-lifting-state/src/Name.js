import React from 'react';

export default function Name() {
  const [name, setName] = React.useState('');

  return (
    <>
      <div>
        <label htmlFor="name">Name: </label>
        <input 
          id="name" 
          value={name} 
          onChange={event => setName(event.target.value)} 
        />
      </div>
      <div>{`Эй ${name}, ты молодец!`}</div>
    </>
  )
};