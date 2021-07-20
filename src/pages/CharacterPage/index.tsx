import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ICharacter } from '../../interfaces/ICharacter';
import styles from './CharacterPage.module.css';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';

const CharacterPage = () => {
  const { id } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [character, setCharacter] = useState<ICharacter>();

  const getCharacter = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      setTimeout(() => {
        setCharacter(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMsg='Can not fetch character :(' />;
  }

  return (
    <>
      {character && (
        <div className={styles.character__page}>
          <img
            className={styles.character__image}
            src={character.image}
            alt={character.name}
          />
          <h3 className={styles.character__name}>{character.name}</h3>

          <div className={styles.character__bio}>
            <h4>List of episodes in which this character appeared</h4>
            <div className={styles.episodes__container}>
              {character.episode.map((e, index) => (
                <div className={styles.episodes__item} key={index}>
                  {e.split('episode')[1].split('/')[1]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterPage;
