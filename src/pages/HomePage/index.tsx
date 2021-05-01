import axios from "axios";
import React, { useState, useEffect } from "react";
import CharacterList from "../../components/characters/CharacterList";
import { ICharacter } from "../../interfaces/ICharacter";

const HomePage = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  const getCharacters = async () => {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );

    setCharacters(data.results);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div>
      <CharacterList characters={characters}/>
    </div>
  );
};

export default HomePage;
