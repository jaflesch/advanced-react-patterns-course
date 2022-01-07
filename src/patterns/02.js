import React, { useCallback, useMemo, useState, createContext } from "react";
import { ClapCount, ClapIcon, CountTotal } from './components';
import useClapAnimation from "./hooks/useClapAnimation";
import styles from './index.css';
import Provider from "./store/MediumClapContext";

const MediumClap = ({ children }) => {
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

  const memoizedValue = useMemo(() => ({
    count,
    total,
    isClicked,
    setRef,
  }), [count, total, isClicked, setRef]);

  return (
    <Provider value={memoizedValue}>
      <button 
        ref={setRef} 
        data-refkey="clapRef" 
        className={styles.clap} 
        onClick={onClickCapHandler}
      >
        { children }
      </button>
    </Provider>
  );
}

export default () => (
  <MediumClap>
    <ClapIcon  />
    <ClapCount />
    <CountTotal />
  </MediumClap>
);
