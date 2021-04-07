import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({ currentUser, authRequired, component, path }) => {
  const redirect = authRequired ? "/login" : "/home";

  if ((authRequired && !currentUser) || (!authRequired && currentUser)) {
    return <Redirect to={redirect} />;
  }
  return <Route exact path={path} component={component} />;
};

export default ProtectedRoutes;
