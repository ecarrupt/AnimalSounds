import { useState } from "react";
import AnimalTag, { Animal } from "./AnimalTag";
import "./App.css";
import dataSource from "./data.json";

function App() {
  const [data] = useState<Animal[]>(dataSource.animals
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value));
  const [sound] = useState(new Audio(""));
  const [selected, setSelected] = useState<Animal|null>(null);

  const onEnded = () => {
    setSelected(null)
  }

  const onPlay = (name: string) => {
    if (!selected || selected.name !== name) {
      const newSelected = data.find(a => a.name === name)!;
      sound.src = "./sounds/" + newSelected.sound;
      sound.load();
      sound.play();
      if (!sound.onended) {
        sound.onended = onEnded
      }
      setSelected(newSelected);
    }
  };

  return (
    <div className="App">
      <div className="AnimalList">
        {data.map((a) => {
          return (
            <AnimalTag
              key={a.name}
              animal={a}
              onPlay={onPlay}
              playing={selected ? selected.name:""}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
