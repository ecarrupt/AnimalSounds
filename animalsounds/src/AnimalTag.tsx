import { FC, useState } from "react";

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

  return (
    <div onClick={playSound}>
      {props.animal.name === props.playing && (<div>PLAYING</div>)}
      <div>{props.animal.name}</div>
      <img src={"./photos/" + props.animal.photo} />
    </div>
  );
};

export default AnimalTag;
