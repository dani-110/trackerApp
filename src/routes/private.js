import React from "react";
import { Navigate } from "react-router-dom";
import User from "../screens/user/user";
import Teams from "../screens/teams/teams";
import DetailView from "../screens/teams/detailView";
import Roles from "../screens/roles/roles";
import Permissions from "../screens/permissions/permissions";
import OragnizationalUnits from "../screens/oragnizationalUnits/oragnizationalUnits";
import FunctionalUnit from "../screens/functionalUnit/functionalUnit";
import Queues from "../screens/queues/queues";

export const privateRoutes = [
    { index: true, element: <Navigate to="/user" /> },
    {
        path: 'user',
        element: <User />
    },
    {
        path: 'roles',
        element: <Roles />
    },
    {
        path: 'permissions',
        element: <Permissions />
    },
    {
        path: 'oragnizationalUnits',
        element: <OragnizationalUnits />
    },
    {
        path: 'functionalUnit',
        element: <FunctionalUnit />
    },
    {
        path: 'queues',
        element: <Queues />
    },
    {
        path: 'teams',
        children: [
            { index: true, element: <Teams /> },
            {
                path: 'Details',
                element: <DetailView />
            }
        ]
    }
];
