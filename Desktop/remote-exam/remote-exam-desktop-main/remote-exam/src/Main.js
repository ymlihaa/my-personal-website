import React from "react";
import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import TeacherLogin from "./components/TeacherLogin";
import App from "./components/App";
import Optik from "./components/Optik";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Header from "./components/Header";

// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
// import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";

function Main() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <PrivateRoute exact path="/">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/update-profile">
              <UpdateProfile />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/teacher">
              <TeacherLogin />
            </Route>
            <Route path="/exam">
              <App />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default Main;
