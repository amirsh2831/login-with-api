import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/login";
import HomePage from "./components/homePage/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./components/signIn/SignIn";

function ProtectedRoute() {
  const user = useSelector((state) => state.user.currentUser);
  return user ? <HomePage /> : <Navigate to={"/login"} />;
}

function App() {
  return (
    <>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignIn />} path="/signup" />
        </Routes>
      </Router>
      {/* <HomePage /> */}
    </>
  );
}

export default App;
