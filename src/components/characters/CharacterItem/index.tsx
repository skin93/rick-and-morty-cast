import React from "react";
import { Link } from "react-router-dom";
import { ICharacter } from "../../../interfaces/ICharacter";
import styles from "./CharacterItem.module.css";

type Props = {
  character: ICharacter;
};

const CharacterItem = ({ character }: Props) => {
  const characterStatus =
    character.status === "Alive"
      ? `${styles.character_status_alive} ${styles.status_dot}`
      : character.status === "Dead"
      ? `${styles.character_status_dead} ${styles.status_dot}`
      : `${styles.character_status_unknown} ${styles.status_dot}`;

  return (
    <div className={styles.character_wrapper}>
      <div className={styles.overlay}>
        <Link to={`/characters/${character.id}`}>
          <button>Read more </button>
        </Link>
      </div>
      <img
        className={styles.character_img}
        src={character.image}
        alt={character.name}
      />
      <div className={styles.character_body}>
        <h3 className={styles.character_name}>{character.name}</h3>
        <div className={styles.character_status}>
          <span className={characterStatus}></span> {character.status}
        </div>
        <h4 className={styles.character_info}>
          {character.species} | {character.gender}
        </h4>
        <div className={styles.character_last_location}>
          <p>Last known location:</p>
          <h4>{character.location.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
