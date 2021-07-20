import React from 'react';
import { IEpisode } from '../../../interfaces/IEpisode';
import EpisodeItem from '../EpisodeItem';
import styles from './EpisodeList.module.css';

type Props = {
  episodes: IEpisode[];
};

const EpisodeList = ({ episodes }: Props) => {
  return (
    <div className={styles.episodes__wrapper}>
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </div>
  );
};

export default EpisodeList;
