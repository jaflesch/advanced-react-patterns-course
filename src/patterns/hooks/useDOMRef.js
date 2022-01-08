import { useState, useCallback } from 'react';

const useDOMRef = () => {
  const [DOMRef, setDOMRef] = useState({});

  const setRef = useCallback((node) => {
    setDOMRef(prevState => ({
      ...prevState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  return [DOMRef, setRef];
}

export default useDOMRef;