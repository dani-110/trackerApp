import { Navigate } from "react-router-dom";
import Login from "../screens/login/login";
import React from "react";

export const publicRoutes = [
    { index: true, element: <Navigate to="/" /> },
    { path: "/login", element: <Login /> },
];
