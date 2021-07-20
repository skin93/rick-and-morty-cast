import React from 'react';
import styles from './Error.module.css';

const Error = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <div className={styles.error}>
      <span>{errorMsg}</span>
    </div>
  );
};

export default Error;
