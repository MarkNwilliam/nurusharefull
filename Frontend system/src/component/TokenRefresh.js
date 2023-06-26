import React, { useEffect } from 'react';
import axios from 'axios';

const TokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      if (token) {
        // Send a request to the token verification API
        axios.post('https://nurushare.azurewebsites.net/verify', { token })
          .then(response => {
            // Token is valid
            console.log("Token is valid")
            // You can perform any necessary actions here, such as updating the user's authentication status or refreshing the token in local storage
          })
          .catch(error => {
            // Token verification failed
            // You can handle the error, such as redirecting the user to the login page or logging them out
            if (error.response && error.response.status === 401) {
              // Unauthorized: Token is invalid
              // Remove the token from local storage
              localStorage.removeItem('token');
              // Perform any additional actions, such as redirecting to the login page or resetting the user's authentication status
            }
          });
      }
    }, 60000); // Interval of 1 minute (adjust as needed)

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(interval);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TokenRefresh;
