import React, { useContext, useEffect } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(authContext);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("You must login first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [isLoggedIn]);

    // If Not Logged In Go to Login page
    return isLoggedIn ?  children : <Navigate to={'/login'} state={{ from: location.pathname }} />
}
