import React, {useContext} from 'react';
import { MediumClapContext } from '../store/MediumClapContext';
import styles from '../index.css';

const ClapCount = ({className, style : userStyle = {}, ...restProps}) => {
  const { count, setRef } = useContext(MediumClapContext);
  const classNames = [styles.count, className].join(' ').trim();

  return (
    <span 
      ref={setRef} 
      data-refkey="clapCountRef"
      className={classNames}
      style={userStyle}
      {...restProps}
    >
      +{ count }
    </span>
  );
}

export default ClapCount;