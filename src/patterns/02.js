import React, { useCallback, useMemo, useState, createContext, useEffect, useRef } from "react";
import { ClapCount, ClapIcon, CountTotal } from './components';
import { useClapAnimation, useDOMRef, } from "./hooks/";
import styles from './index.css';
import Provider from "./store/MediumClapContext";
import userStyle from './usage.css';

const MediumClap = ({ children, onClap, className, style : userStyles }) => {
  const MAXIMUM_USER_CLAP = 50;
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(101010);
  const [{clapRef, clapCountRef, clapTotalRef}, setRef] = useDOMRef();
  const [isClicked, setIsClicked] = useState(false);
  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });
  const componentFirstRender = useRef(true);
  const classNames = [styles.clap, className].join(' ').trim();

  useEffect(() => {
    if (!componentFirstRender.current) {
      onClap && onClap({
        count, 
        total, 
        isClicked,
      });
    }
    componentFirstRender.current = false;
  }, [count, total, isClicked]);
  
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
        className={classNames} 
        onClick={onClickCapHandler}
        style={userStyles}
      >
        { children }
      </button>
    </Provider>
  );
}

export default () => {
  const [count, setCount] = useState(0);

  const onClapHandler = (state) => {
    setCount(state.count);
  }

  return (
    <div style={{flexDirection:'column'}}>
      <MediumClap onClap={onClapHandler}>
        <ClapIcon />
        <ClapCount />
        <CountTotal />
      </MediumClap>
      <div className={styles.info}>
        You clicked {count} times
      </div>
    </div>
  );
}
