import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import MainLayout from "./mainlayout/mainlayout";

const RequireAuth = () => {

  const location = useLocation();
  const { user,isLoggedIn} = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{
          visitedLocation: location.pathname,
        }}
        replace
      />
    );
  }
  if (user?.mustChangePassword && location.pathname !== "/changePassword") {
    return <Navigate to="/changePassword" replace />;
  }

  return <MainLayout />;
};

export default RequireAuth;
