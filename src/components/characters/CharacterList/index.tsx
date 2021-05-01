import React, { Fragment } from "react";
import { ICharacter } from "../../../interfaces/ICharacter";

type Props = {
  characters: ICharacter[];
};

const CharacterList = ({ characters }: Props) => {
  return (
    <Fragment>
      {characters.map((char) => (
        <div key={char.id}>
          <h3>{char.name}</h3>
        </div>
      ))}
    </Fragment>
  );
};

export default CharacterList;
