import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './HomePage.module.css';
import CharacterList from '../../components/characters/CharacterList';
import { ICharacter } from '../../interfaces/ICharacter';
import { IInfo } from '../../interfaces/IInfo';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';

const HomePage = () => {
  const location = useLocation();
  const history = useHistory();
  const pageQuery = new URLSearchParams(location.search).get('page') || 1;
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [info, setInfo] = useState<IInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pageNumber, setPageNumber] = useState(pageQuery);

  const getCharacters = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setTimeout(() => {
        setCharacters(data.results);
        setInfo(data.info);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    getCharacters(
      `https://rickandmortyapi.com/api/character?page=${pageQuery}`
    );
  }, [pageQuery, getCharacters]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMsg='Can not fetch characters :(' />;
  }

  return (
    <div>
      <CharacterList characters={characters} />
      {info && (
        <div className={styles.nav__buttons}>
          <button
            disabled={info.prev === null}
            onClick={() => {
              history.push(`?page=1`);
              setPageNumber(1);
            }}>
            First
          </button>
          <button
            disabled={info.prev === null}
            onClick={() => {
              history.push(`?page=${+pageNumber - 1}`);
              setPageNumber((p) => +p - 1);
            }}>
            Prev
          </button>
          <span>{pageQuery}</span>
          <button
            disabled={info.next === null}
            onClick={() => {
              history.push(`?page=${+pageNumber + 1}`);
              setPageNumber((p) => +p + 1);
            }}>
            Next
          </button>
          <button
            disabled={info.next === null}
            onClick={() => {
              history.push(`?page=34`);
              setPageNumber(34);
            }}>
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
