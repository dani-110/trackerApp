import { useContext } from "react";
import { useSelector } from "react-redux";
import React, { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

const BlankLayout = () => {

  const {
    isLoggedIn
  } = useSelector((state) => state.auth);

  const location = useLocation();
  if (isLoggedIn) {
    return (
      <Navigate
        to="/"
        state={{
          visitedLocation: location.pathname,
        }}
        replace
      />
    );
  }
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default BlankLayout;
