import React, {useContext} from 'react';
import { MediumClapContext } from '../store/MediumClapContext';
import styles from '../index.css';

const ClapCount = ({style : userStyle = {}}) => {
  const { count, setRef } = useContext(MediumClapContext);

  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountRef"
      className={styles.count}
      style={userStyle}
    >
      +{ count }
    </span>
  );
}

export default ClapCount;