import { FC, useState } from "react";

export class Animal {
  name!: string;
  photo!: string;
  sound!: string;
}

export class AnimalTagProps {
  onPlay!: (name: string) => void;
  playing!: boolean;
  animal!: Animal;
}

const AnimalTag: FC<AnimalTagProps> = (props: AnimalTagProps) => {
  const playSound = () => {
    props.onPlay(props.animal.name);
  };

  return (
    <div onClick={playSound}>
      <div>{props.animal.name}</div>
      <img src={"./photos/" + props.animal.photo} />
    </div>
  );
};

export default AnimalTag;
