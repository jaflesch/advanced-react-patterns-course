import { useState, useCallback } from 'react';

const useClapState = (initialState = { 
  count: 0,
  total: 101010,
  isClicked: false,
}) => {
  const [count, setCount] = useState(initialState.count);
  const [total, setTotal] = useState(initialState.total);
  const [isClicked, setIsClicked] = useState(initialState.isClicked);
  const MAXIMUM_USER_CLAP = 50;
  
  const updateState = useCallback(() => {
    setCount(prevState => {
      if (prevState < MAXIMUM_USER_CLAP) {
        const incCount = prevState + 1;
        setTotal(prevState => prevState + 1);
        
        return incCount;
      }
      return prevState;
    });
  
    setIsClicked(true);
  }, []); 

  const counterProps = {
    count,
    "aria-valuemin": 0,
    "aria-valuemax": MAXIMUM_USER_CLAP,
    "aria-valuenow": count,
  }

  const iconProps = {
    onClick: updateState,
    "aria-pressed": isClicked,
  }

  return [{ 
    count, 
    total, 
    isClicked, 
    counterProps,
    iconProps,
  }, updateState];
}

export default useClapState;