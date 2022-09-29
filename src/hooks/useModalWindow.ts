import { useEffect } from 'react';

const useModalWindow = () => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);
};

export default useModalWindow;
