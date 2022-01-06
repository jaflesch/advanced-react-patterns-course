import React, { useCallback, useState } from "react";
import { ClapCount, ClapIcon, CountTotal } from './components';
import useClapAnimation from "./hooks/useClapAnimation";
import styles from './index.css';

const MediumClap = () => {
  const MAXIMUM_USER_CLAP = 50;
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(101010);
  const [{clapRef, clapCountRef, clapTotalRef}, setRefState] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });

  const setRef = useCallback((node) => {
    setRefState(prevState => ({
      ...prevState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  const onClickCapHandler = () => {
    animationTimeline.replay();
    setCount(prevState => {
      if (prevState < MAXIMUM_USER_CLAP) {
        const incCount = prevState + 1;
        setTotal(prevState => prevState + 1);
        
        return incCount;
      }
      return prevState;
    });

    setIsClicked(true);
  }

  return (
    <button 
      ref={setRef} 
      data-refkey="clapRef" 
      className={styles.clap} 
      onClick={onClickCapHandler}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount 
        count={count} 
        setRef={setRef} 
      />
      <CountTotal 
        total={total} 
        setRef={setRef} 
      />
    </button>
  );
}

export default MediumClap;
