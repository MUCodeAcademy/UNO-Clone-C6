import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({ currentUser, authRequired, component, path }) => {
    const redirect = authRequired ? "/Login" : "/";
  
    if ((authRequired && !currentUser) || (!authRequired && currentUser)) {
      return <Redirect to={redirect} />;
    }
    return <Route path={path} component={component} />;
  };
  
  export default ProtectedRoutes;
