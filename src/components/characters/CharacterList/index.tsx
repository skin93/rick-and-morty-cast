import React from "react";
import { ICharacter } from "../../../interfaces/ICharacter";
import CharacterItem from "../CharacterItem";
import styles from "./CharacterList.module.css";

type Props = {
  characters: ICharacter[];
};

const CharacterList = ({ characters }: Props) => {
  return (
    <div className={styles.characters_wrapper}>
      {characters.map((char) => (
        <CharacterItem key={char.id} character={char} />
      ))}
    </div>
  );
};

export default CharacterList;
