import stationarygeneration from '../../assests/stationarygeneration.png'
import userManagement from '../../assests/user_management.png'
import international from '../../assests/international.png'
import stationarylog from '../../assests/stationarylog.png'
import pakistan from '../../assests/pakistan.png'
import creditcard from '../../assests/creditcard.png'

export const navBar = [
  {
    label: 'Workspace',
    icon: 'LuLayoutDashboard',
    subTab: [
      {
        label: 'Overview',
        icon: 'LuLayoutDashboard',
        url:''
      },
    ]
  },
  {
    label: 'Work',
    icon: 'LuTicket',
    subTab: [
      {
        label: 'Tickets',
        icon: 'LuTicket',
        url:'tickets'
      },
      {
        label: 'Approvals',
        icon: 'LuShieldCheck',
        url:''
      },
    ]
  },
  {
    label: 'Time',
    icon: 'WiTime3',
    subTab: [
      {
        label: 'My Timesheet',
        icon: 'WiTime3',
        url:'timeSheet'
      },
      {
        label: 'Compliance',
        icon: 'LuActivity',
        url:'timeSheet/timesheetCompliance'
      },
    ]
  },
  {
    label: 'Administration',
    icon: 'LuShieldCheck',
    subTab: [
      {
        label: 'User & Access',
        icon: 'LuUsers',
        url:'user'
      },
      {
        label: 'Organization',
        icon: 'LuBuilding2',
        url:'oragnizationalUnits'
      },
      {
        label: 'System Logs',
        icon: 'LuScrollText',
        url:''
      },
    ]
  },
]

export const navData = [
  // {
  //   label: "Mailer Generation",
  //   icon: userManagement,
  //   url: "mailerGeneration",
  // },
  {
    label: 'User & Access',
    type: 'category'
  },
  {
    label: "User",
    icon: userManagement,
    url: "user"
  },
  {
    label: "Roles",
    icon: userManagement,
    url: "roles"
  },
  {
    label: "Permissions",
    icon: userManagement,
    url: "permissions"
  },
  {
    label: 'Organization',
    type: 'category'
  },
  {
    label: "Oragnizational Units",
    icon: userManagement,
    url: "oragnizationalUnits"
  },
  {
    label: "Teams",
    icon: userManagement,
    url: "teams"
  },
  {
    label: "Functional Units",
    icon: userManagement,
    url: "functionalUnit"
  },
  {
    label: "Queues",
    icon: userManagement,
    url: "queues"
  },
  {
    label: "Tickets",
    icon: userManagement,
    url: "tickets"
  },

];
