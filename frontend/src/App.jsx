import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import Upload from "./pages/upload/Upload.jsx";

const App = () => {
  const { authUser, isAuthenticated } = useAuthContext();

  return (
    <div className="p-4 h-screen flex flex-col items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            authUser || isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            authUser || isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            authUser || isAuthenticated ? <Navigate to="/" /> : <SignUp />
          }
        />
        <Route
          path="/upload"
          element={
            authUser || isAuthenticated ? <Upload /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
