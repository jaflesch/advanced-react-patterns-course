import React, {useContext} from 'react';
import { MediumClapContext } from '../store/MediumClapContext';
import styles from '../index.css';

const CountTotal = ({className, style : userStyle = {}}) => {
  const { total, setRef } = useContext(MediumClapContext);
  const classNames = [styles.total, className].join(' ').trim();

  return (
    <span 
      ref={setRef} 
      data-refkey="clapTotalRef"
      className={classNames}
      style={userStyle}
    >
      { total }
    </span>
  );
}

export default CountTotal;
