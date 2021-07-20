import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ICharacter } from '../../interfaces/ICharacter';
import styles from './CharacterPage.module.css';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';
import Container from '../../components/layout/Container';

import getEpisodeID from '../../lib/getEpisodeID';
import { IParam } from '../../interfaces/IParam';

const CharacterPage = () => {
  const { id } = useParams<IParam>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [character, setCharacter] = useState<ICharacter>();
  const history = useHistory();

  const characterStatus =
    character?.status === 'Alive'
      ? `${styles.character__status__alive} ${styles.status__dot}`
      : character?.status === 'Dead'
      ? `${styles.character__status__dead} ${styles.status__dot}`
      : `${styles.character__status__unknown} ${styles.status__dot}`;

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
    getCharacter(parseInt(id));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMsg='Can not fetch character :(' />;
  }

  return (
    <Container>
      {character && (
        <section className={styles.character__page}>
          <div className={styles.character__wrapper}>
            <img
              className={styles.character__image}
              src={character.image}
              alt={character.name}
            />
            <div className={styles.character__body}>
              <h2 className={styles.character__name}>{character.name}</h2>
              <div className={styles.character__status}>
                <span className={characterStatus}></span> {character.status}
              </div>
              <h4 className={styles.character__info}>
                {character.species} | {character.gender}
              </h4>
              <div className={styles.character__lastLocation}>
                <p>Last known location:</p>
                <h4>{character.location.name}</h4>
              </div>
            </div>
          </div>
          <div className={styles.character__episodes}>
            <h3>Episodes that character appeared</h3>
            <div className={styles.episodes__container}>
              {character.episode.map((item, index) => (
                <div
                  onClick={() =>
                    history.push(`/episodes/${getEpisodeID(item)}`)
                  }
                  key={index}
                  className={styles.episodes__item}>
                  {getEpisodeID(item)}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Container>
  );
};

export default CharacterPage;
