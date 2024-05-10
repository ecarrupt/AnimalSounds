import { DragEvent, FC } from "react";
import "./AnimalTag.css"

export class Animal {
  name!: string;
  photo!: string;
  sound!: string;
}

export class AnimalTagProps {
  onPlay!: (name: string) => void;
  playing!: string;
  animal!: Animal;
}

const AnimalTag: FC<AnimalTagProps> = (props: AnimalTagProps) => {
  const playSound = () => {
    props.onPlay(props.animal.name);
  };

  const onDragStart = (ev : DragEvent<Element>) => {
    ev.stopPropagation();
    props.onPlay(props.animal.name);
  }

  return (
    <div onClick={playSound} onDragStart={onDragStart}>
      <div className={(props.animal.name === props.playing ? "playing" : "") + " image-cropper"} >
      <img src={"./photos/" + props.animal.photo} width={200} height={200} alt={props.animal.name} /></div>
      <div>{props.animal.name}</div>
    </div>
  );
};

export default AnimalTag;
