import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { IEpisode } from '../../interfaces/IEpisode';
import { IParam } from '../../interfaces/IParam';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';
import Container from '../../components/layout/Container';

import styles from './EpisodePage.module.css';

const EpisodePage = () => {
  const { id } = useParams<IParam>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [episode, setEpisode] = useState<IEpisode>();

  const getEpisode = useCallback(async (id: number): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      setTimeout(() => {
        setEpisode(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    getEpisode(parseInt(id));
  }, [getEpisode, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMsg='Can not fetch episode :(' />;
  }

  return (
    <Container>
      <div className={styles.episode__page}>
        <p>{episode?.id}</p>
      </div>
    </Container>
  );
};

export default EpisodePage;
