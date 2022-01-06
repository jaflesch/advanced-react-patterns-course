import React from 'react';
import styles from '../index.css';

const CountTotal = ({ total, setRef }) => (
  <span 
    ref={setRef} 
    data-refkey="clapTotalRef"
    className={styles.total}
  >
    { total }
  </span>
);

export default CountTotal;