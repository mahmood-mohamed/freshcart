import { useContext } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate } from 'react-router-dom';

export default function AuthProtectedRoute({children}) {
  
  const {isLoggedIn} = useContext(authContext);
    // If Logged In Go to Home Not go to login or register
    return  isLoggedIn ? <Navigate to={'/'} /> : children
}
