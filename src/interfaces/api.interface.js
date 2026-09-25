//testing
// import { loadConfig } from './configLoader';

// let apiURL = '';

// loadConfig().then(res => {
//   apiURL = res.apiURLUBL
// })

// export const apiURL = "http://10.224.115.114:8750/api";

// export const apiURL = "http://192.168.15.35:8750/api";
// export const apiURL = "https://cosigner-unmanaged-wolf.ngrok-free.dev/api";
// export const apiURL = "https://large-retying-goofball.ngrok-free.dev/api/v1";
export const apiURL = "http://100.107.106.84:8080/api/v1";
export const api = {

  //================Auth================
  login: () => {
    return {
      url: `${apiURL}/auth/login`,
      method: "post",
    };
  },
  me: () => {
    return {
      url: `${apiURL}/me`,
      method: "get",
    };
  },
  logout: () => {
    return {
      url: `${apiURL}/ad/logout`,
      method: "post",
    };
  },

  //================User==================
  users: (pageNo = 1, pageSize = 10) => {
    return {
      url: `${apiURL}/users?pageNo=${pageNo}&pageSize=${pageSize}`,
      method: "get",
    }
  },
  createUsers: () => {
    return {
      url: `${apiURL}/users`,
      method: "post",
    }
  },
  editUsers: (id) => {
    return {
      url: `${apiURL}/users/${id}`,
      method: "put",
    }
  },
  changeStatusUsers: (id) => {
    return {
      url: `${apiURL}/users/${id}/status`,
      method: "patch",
    }
  },
  roleUsers: (id) => {
    return {
      url: `${apiURL}/users/${id}/roles`,
      method: "post",
    }
  },
  getRoleUsers: (id) => {
    return {
      url: `${apiURL}/users/${id}/roles`,
      method: "get",
    }
  },
  revokeRoleUsers: (userId, roleId) => {
    return {
      url: `${apiURL}/users/${userId}/roles/${roleId}`,
      method: "delete",
    }
  },
  //================Teams==================
  teams: () => {
    return {
      url: `${apiURL}/teams?activeOnly=true`,
      method: "get",
    }
  },
  teamsMember: (id) => {
    return {
      url: `${apiURL}/teams/${id}/members?currentOnly=true`,
      method: "get",
    }
  },
  addTeamsMember: (id) => {
    return {
      url: `${apiURL}/teams/${id}/members`,
      method: "post",
    }
  },
  removeTeamsMember: (teamId, userId) => {
    return {
      url: `${apiURL}/teams/${teamId}/members/${userId}`,
      method: "delete",
    }
  },
  //================Roles==================
  roles: (id) => {
    return {
      url: `${apiURL}/roles?activeOnly=true`,
      method: "get",
    }
  },
  //================Permissions==================
  permissions: (domin) => {
    return {
      url: `${apiURL}/permissions?activeOnly=true&domainCode=${domin || ''}`,
      method: "get",
    }
  },
  //================Oragnizational Units==================
  organizationUnits: (domin) => {
    return {
      url: `${apiURL}/organization-units?activeOnly=true`,
      method: "get",
    }
  },
  //================Functional Units==================
  functionalUnit: (domin) => {
    return {
      url: `${apiURL}/functional-levels?activeOnly=true`,
      method: "get",
    }
  },
  //================Queues==================
  queues: (domin) => {
    return {
      url: `${apiURL}/queues?activeOnly=true`,
      method: "get",
    }
  },
  //================Tickets==================
  tickets: (pageNo = 1, pageSize = 10) => {
    return {
      url: `${apiURL}/tickets?page=${pageNo}&pageSize=${pageSize}`,
      method: "get",
    }
  },
  ticketById: (id) => {
    return {
      url: `${apiURL}/tickets/${id}`,
      method: "get",
    }
  },
  createTickets: () => {
    return {
      url: `${apiURL}/tickets`,
      method: "post",
    }
  },
  acknowledgementApprove: (id) => {
    return {
      url: `${apiURL}/tickets/${id}/acknowledgement/approve`,
      method: "post",
    }
  },
  ticketClassification: (id) => {
    return {
      url: `${apiURL}/tickets/${id}/classification`,
      method: "post",
    }
  },
  ticketAssignment: (id) => {
    return {
      url: `${apiURL}/tickets/${id}/assignment`,
      method: "post",
    }
  },
  //================Fillers==================
  userFiller: (id) => {
    return {
      url: `${apiURL}/userFiller`,
      method: "get",
    }
  },
  roleFiller: (id) => {
    return {
      url: `${apiURL}/roleFiller`,
      method: "get",
    }
  }
};
