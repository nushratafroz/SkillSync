import React from 'react';
import { Navigate } from 'react-router-dom';
import * as jose from 'jose';

// Function to validate JWT
const isTokenValid = async () => {

const authToken = localStorage.getItem('authToken');
const decodedToken = authToken ? jose.decodeJwt(authToken) : null;
  try {
    if (!decodedToken) {
      return false; // No token found
    }
    // Check the expiration
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken')
      return false; // Token has expired
    }

    return true; // Token is valid
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
};

const PrivateRoute = ({ children }) => {

  const [isValid, setIsValid] = React.useState(null);
  React.useEffect(() => {
    // Check the validity of the token on component mount
    isTokenValid().then(setIsValid);
  }, []);

  // While the token check is happening, show a loading message
  if (isValid === null) return <div>Loading...</div>;

  console.log('Token validity:', isValid);

  // If the token is valid, render the protected route, otherwise redirect to login
  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;