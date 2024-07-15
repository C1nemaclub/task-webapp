import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      // Redirect to login if user is not authenticated
      return <Navigate to='/login' />;
    }

    // Render the wrapped component with all its props
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
