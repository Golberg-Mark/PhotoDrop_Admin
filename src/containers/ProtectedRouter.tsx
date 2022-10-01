import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { selectIsLoggedIn } from '@/store/selectors/userSelector';

const ProtectedRouter: React.FC<any> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return <Navigate to="/auth" />;

  return children;
};

export default ProtectedRouter;
