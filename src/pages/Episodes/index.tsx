import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './Episodes.module.css';
import { IInfo } from '../../interfaces/IInfo';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';
import { IEpisode } from '../../interfaces/IEpisode';
import EpisodeList from '../../components/episodes/EpisodeList';

const Episodes = () => {
  const location = useLocation();
  const history = useHistory();
  const pageQuery = new URLSearchParams(location.search).get('page') || 1;
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [info, setInfo] = useState<IInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pageNumber, setPageNumber] = useState(pageQuery);

  const getEpisodes = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setTimeout(() => {
        setEpisodes(data.results);
        setInfo(data.info);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    getEpisodes(`https://rickandmortyapi.com/api/episode?page=${pageQuery}`);
  }, [pageQuery, getEpisodes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMsg='Can not fetch episodes :(' />;
  }

  return (
    <>
      <EpisodeList episodes={episodes} />
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
    </>
  );
};

export default Episodes;
