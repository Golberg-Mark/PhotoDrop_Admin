import React, { useEffect } from 'react';

type Callback = () => void;

export default <R extends HTMLDivElement | HTMLUListElement>(callback: Callback) => {
  const containerRef = React.useRef<R>(null);

  useEffect(() => {
    const listener = (e: React.SyntheticEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as HTMLDivElement)) {
        callback();
      }

      return null;
    };

    document.body.addEventListener('click', listener as any);

    return () => {
      document.body.addEventListener('click', listener as any);
    };
  }, [callback]);

  return containerRef;
};
