import React from 'react';
import { useParams } from 'react-router';
import { IParam } from '../../interfaces/IParam';

const EpisodePage = () => {
  const { id } = useParams<IParam>();
  return <div>Page of episode {id} </div>;
};

export default EpisodePage;
