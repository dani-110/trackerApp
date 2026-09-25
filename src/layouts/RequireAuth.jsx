import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import MainLayout from "./mainlayout/mainlayout";

const RequireAuth = () => {
  const {
    isLoggedIn,
  } = useSelector((state) => state.auth);

  const location = useLocation();


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

  return <MainLayout />;
};

export default RequireAuth;
