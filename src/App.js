import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GamePage from "./components/Game/GamePage";
import HomePage from "./components/Home/HomePage";
import UserSettingsPage from "./components/UserSettings/UserSettingsPage";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";
import ResetPasswordPage from "./components/ResetPassword/ResetPasswordPage";
import ProtectedRoutes from "./shared/ProtectedRoutes";
import { UserContext } from "./shared/UserContext";
import AppMenu from "./shared/AppMenu";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <Router>
      <AppMenu />
      <div className="container">
        <Switch>
          <ProtectedRoutes
            currentUser={currentUser}
            path="/login"
            authRequired={false}
            component={LoginPage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/signup"
            authRequired={false}
            component={SignupPage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/reset-password"
            authRequired={false}
            component={ResetPasswordPage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/settings"
            authRequired={true}
            component={UserSettingsPage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/game/:gameId"
            authRequired={true}
            component={GamePage}
          />
          <ProtectedRoutes
            currentUser={currentUser}
            path="/home"
            authRequired={true}
            component={HomePage}
          />
        </Switch>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </div>
    </Router>
  );
}

export default App;
