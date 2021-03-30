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
        {/* <ProtectedRoutes currentUser={currentUser} path="/Login" authRequired={false} component={LoginPage} /> */}
        {/* <ProtectedRoutes currentUser={currentUser} path="/Signup" authRequired={false} component={SignupPage} /> */}
        <ProtectedRoutes
          currentUser={currentUser}
          path="/ResetPassword"
          authRequired={false}
          component={ResetPasswordPage}
        />
        {/* <ProtectedRoutes currentUser={currentUser} path="/UserSettings" authRequired={true} component={UserSettingsPage} /> */}
        {/* <ProtectedRoutes currentUser={currentUser} path="/" authRequired={true} component={HomePage} /> */}
        {/* <ProtectedRoutes currentUser={currentUser} path="/GamePage" authRequired={true} component={GamePage} /> */}
        {/* <Route path = "*"> */}
        {/* <Redirect to = "/Login" /> */}
        {/* </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
