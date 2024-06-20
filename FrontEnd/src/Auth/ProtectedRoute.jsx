import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if(isAuthenticated){

    return children
    
  }
  else{
   return  <Navigate to="/"/>
  }


};

export default ProtectedRoute;
