import { useEffect, useRef } from 'react';

const useAfterMount = (callback, dependencies) => {
  const componentFirstRender = useRef(true);
  useEffect(() => {
    if (!componentFirstRender.current) {
      return callback();
    }
    componentFirstRender.current = false;
  }, [dependencies]);
}

export default useAfterMount;