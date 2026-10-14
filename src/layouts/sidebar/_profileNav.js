// import stationarygeneration from "../../assests/stationarygeneration.png";
import userManagement from "../../assests/user_management.png";
import { permissions } from "../../store/actions/permissions";
// import international from "../../assests/international.png";
// import stationarylog from "../../assests/stationarylog.png";
// import pakistan from "../../assests/pakistan.png";
// import creditcard from "../../assests/creditcard.png";

export const navBar = [
  {
    label: "Workspace",
    icon: "LuLayoutDashboard",
    subTab: [
      {
        label: "Overview",
        icon: "LuLayoutDashboard",
        url: "dashboard",
        permissions: 'DASHBOARD_VIEW',
      },
    ],
  },
  {
    label: "Work",
    icon: "LuTicket",
    subTab: [
      {
        label: "Tickets",
        icon: "LuTicket",
        url: "tickets",
        permissions: 'TICKET_VIEW',
      },
      {
        label: "Approvals",
        icon: "LuShieldCheck",
        url: "approvals",
        permissions:'APPROVAL_DECIDE'
      },
    ],
  },
  {
    label: "Time",
    icon: "WiTime3",
    subTab: [
      {

        label: 'My Timesheet',
        icon: 'WiTime3',
        url: 'timeSheet',
        permissions: 'TIMESHEET_VIEW',
      },
      {
        label: 'Compliance',
        icon: 'LuActivity',
        url: 'timeSheet/timesheetCompliance',
        permissions: 'TIMESHEET_COMPLIANCE_VIEW',
      },
    ],
  },
  {
    label: "Administration",
    icon: "LuShieldCheck",
    subTab: [
      {
        label: "User & Access",
        icon: "LuUsers",
        url: "user",
        permissions: 'USER_VIEW',
      },
      {
        label: "Teams",
        icon: "UsersRound",
        url: "teams",
        permissions: 'TICKET_VIEW',
      },
      {
        label: "Roles",
        icon: "UserShield",
        url: "roles",
        permissions:'ROLE_VIEW',
      },
      {
        label: "Organization",
        icon: "LuBuilding2",
        url: "oragnizationalUnits",
        permissions:'ORG_UNIT_VIEW',
      },
      {
        label: "Functional-level Units",
        icon: "Boxes",
        url: "functionalUnit",
        permissions:'FUNCTIONAL_LEVEL_VIEW',
      },
      {
        label: "Queues",
        icon: "Rows4",
        url: "queues",
        permissions:'QUEUE_VIEW',
      },
      {
        label: "Permissions",
        icon: "UserKey",
        url: "permissions",
        permissions:'PERMISSION_VIEW'
      },
      {
        label: "System Logs",
        icon: "LuScrollText",
        url: "",
        permissions: "",
      },

    ],
  },
];

export const navData = [
  // {
  //   label: "Mailer Generation",
  //   icon: userManagement,
  //   url: "mailerGeneration",
  // },
  {
    label: "User & Access",
    type: "category",
  },
  {
    label: "User",
    icon: userManagement,
    url: "user",
  },
  {
    label: "Roles",
    icon: userManagement,
    url: "roles",
  },
  {
    label: "Permissions",
    icon: userManagement,
    url: "permissions",
  },
  {
    label: "Organization",
    type: "category",
  },
  {
    label: "Oragnizational Units",
    icon: userManagement,
    url: "oragnizationalUnits",
  },
  {
    label: "Teams",
    icon: userManagement,
    url: "teams",
  },
  {
    label: "Functional Units",
    icon: userManagement,
    url: "functionalUnit",
  },
  {
    label: "Queues",
    icon: userManagement,
    url: "queues",
  },
  {
    label: "Tickets",
    icon: userManagement,
    url: "tickets",
  },
];
