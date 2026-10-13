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
import Tickets from "../screens/tickets/tickets";
import TicketDetail from "../screens/tickets/ticketDetail";
import ApprovalQueue from "../screens/tickets/approvalQueue";
import TimeSheet from "../screens/timesheet/timeSheet";
import TimesheetCompliance from "../screens/timesheetCompliance/timesheetCompliance";
import Dashboard from "../screens/dashboard/dashboard";

export const privateRoutes = [
  { index: true, element: <Dashboard /> }, 
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "roles",
    element: <Roles />,
  },
  {
    path: "permissions",
    element: <Permissions />,
  },
  {
    path: "oragnizationalUnits",
    element: <OragnizationalUnits />,
  },
  {
    path: "functionalUnit",
    element: <FunctionalUnit />,
  },
  {
    path: "queues",
    element: <Queues />,
  },
  {
    path: "approvals",
    element: <ApprovalQueue />,
  },
  {
    path: "teams",
    children: [
      { index: true, element: <Teams /> },
      {
        path: "Details",
        element: <DetailView />,
      },
    ],
  },
  {
    path: "timeSheet",
    children: [
      { index: true, element: <TimeSheet /> },
      {
        path: "timesheetCompliance",
        element: <TimesheetCompliance />,
      },
    ],
  },
  {
    path: "tickets",
    children: [
      { index: true, element: <Tickets /> },
      {
        path: "Details",
        element: <TicketDetail />,
      },
    ],
  },
];
