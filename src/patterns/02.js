import React, { useCallback, useMemo, useState, createContext, useEffect, useRef } from "react";
import { ClapCount, ClapIcon, CountTotal } from './components';
import { 
  useClapAnimation, 
  useDOMRef, 
  useClapState,
  useAfterMount,
} from "./hooks/";
import styles from './index.css';
import Provider from "./store/MediumClapContext";

const MediumClap = ({ children, onClap, className, style : userStyles }) => {
  const [{ count, total, isClicked}, updateClapState] = useClapState();
  const [{clapRef, clapCountRef, clapTotalRef}, setRef] = useDOMRef();
  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });
  const classNames = [styles.clap, className].join(' ').trim();

  useAfterMount(()=> {
    animationTimeline.replay();    
  }, [count]);

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
        onClick={() => {
          onClap && onClap({ count, total, isClicked });
          updateClapState();
        }}
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
