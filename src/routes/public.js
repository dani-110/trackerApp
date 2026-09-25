import React, { Navigate } from "react-router-dom";
import Login from "../screens/login/login";

export const publicRoutes = [
    { index: true, element: <Navigate to="/" /> },
    { path: "/login", element: <Login /> },
];
