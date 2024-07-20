import { useState } from "react";
import AnimalTag, { Animal, Category } from "./AnimalTag";
import "./App.css";
import dataSource from "./data.json";

function App() {
  const [categories] = useState<Category[]>(dataSource.categories.sort((a, b) => a.name.localeCompare(b.name)))
  const [category, setCategory] = useState<Category>(categories.find(c => c.id === "africa")!)
  const [animals] = useState<Animal[]>(dataSource.animals
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
      const newSelected = animals.find(a => a.name === name)!;
      sound.src = "./sounds/" + newSelected.sound;
      sound.load();
      sound.play();
      if (!sound.onended) {
        sound.onended = onEnded
      }
      setSelected(newSelected);
    }
  };

  const selectCategory = (cat: Category) => {
    setCategory(cat);
    sound.pause();
    setSelected(null);
  }

  return (
    <div className="App">
      <div className="Header">
        {categories.map(c => {
          return (<div key={c.id} onClick={() => selectCategory(c)} className={"Category" + (c.id === category.id ? " Selected" : "")}>{c.name}</div>)
        })}
      </div>
      <div className="AnimalList">
        {animals.filter(a => a.category === category.id).map((a) => {
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
