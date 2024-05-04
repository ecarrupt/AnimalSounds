import { useState } from 'react';
import AnimalTag, { Animal } from './AnimalTag';
import './App.css';
import dataSource from './data.json';

function App() {

  const [data] = useState<Animal[]>(dataSource.animals);
  const [sounds] = useState(dataSource.animals.map(a => {return {name: a.name, sound: new Audio("./sounds/"+a.sound)}}))

  const onPlay = (name: string) => {
    sounds.map(s => {
      if (s.name === name) {
        s.sound.load()
        s.sound.play()
      } else
        s.sound.pause()
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {data.map(a => {
          return (<AnimalTag animal={a} onPlay={onPlay} playing={false} />)
        })}
      </header>
    </div>
  );
}

export default App;
