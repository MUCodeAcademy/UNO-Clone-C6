import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
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

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <Router>
      <Switch>
        <ProtectedRoutes currentUser={currentUser} path="/login" authRequired={false} component={LoginPage} />
        <ProtectedRoutes currentUser={currentUser} path="/signup" authRequired={false} component={SignupPage} />
        <ProtectedRoutes currentUser={currentUser} path="/resetPassword" authRequired={false} component={ResetPasswordPage} />
        {/* <ProtectedRoutes currentUser={currentUser} path="/userSettings" authRequired={true} component={UserSettingsPage} /> */}
        {/* <ProtectedRoutes currentUser={currentUser} path="/" authRequired={true} component={HomePage} /> */}
        {/* <ProtectedRoutes currentUser={currentUser} path="/game/:gameId" authRequired={true} component={GamePage} /> */}
        <Route path = "*">
        <Redirect to = "/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
