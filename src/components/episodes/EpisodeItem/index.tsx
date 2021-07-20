import React from 'react';
import { Link } from 'react-router-dom';
import { IEpisode } from '../../../interfaces/IEpisode';
import styles from './EpisodeItem.module.css';

type Props = {
  episode: IEpisode;
};

const EpisodeItem = ({ episode }: Props) => {
  return (
    <div className={styles.episode__wrapper}>
      <div className={styles.overlay}>
        <Link to={`/episodes/${episode.id}`}>
          <button>Read more </button>
        </Link>
      </div>
      <div className={styles.episode__body}>
        <h3 className={styles.episode__name}>{episode.name}</h3>
      </div>
    </div>
  );
};

export default EpisodeItem;
