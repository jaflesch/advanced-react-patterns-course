import React, {useContext} from 'react';
import { MediumClapContext } from '../store/MediumClapContext';
import styles from '../index.css';

const CountTotal = ({style : userStyle = {}}) => {
  const { total, setRef } = useContext(MediumClapContext);

  return (
    <span 
      ref={setRef} 
      data-refkey="clapTotalRef"
      className={styles.total}
      style={userStyle}
    >
      { total }
    </span>
  );
}

export default CountTotal;
