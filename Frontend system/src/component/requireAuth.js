import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/signup');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default requireAuth;
