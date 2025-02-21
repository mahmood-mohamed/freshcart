import React, { useContext } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(authContext);
    // If Not Logged In Go to Login page
    return isLoggedIn ?  children : <Navigate to={'/login'} />
}
