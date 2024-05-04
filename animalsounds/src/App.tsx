import { useState } from 'react';
import AnimalTag, { Animal } from './AnimalTag';
import './App.css';
import dataSource from './data.json';

function App() {

  const [data] = useState<Animal[]>(dataSource.animals);
  const [sounds] = useState(dataSource.animals.map(a => {return {name: a.name, sound: new Audio("./sounds/"+a.sound)}}))
  const [playing, setPlaying] = useState<string>("");

  const onPlay = (name: string) => {
    sounds.map(s => {
      if (s.name === name) {
        s.sound.load()
        s.sound.play()
        s.sound.onended = () => {
          setPlaying("");
        }
      } else
        s.sound.pause()
    })
    setPlaying(name);
  }

  return (
    <div className="App">
      <header className="AnimalList">
        {data.map(a => {
          return (<AnimalTag animal={a} onPlay={onPlay} playing={playing} />)
        })}
      </header>
    </div>
  );
}

export default App;
