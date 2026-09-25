import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducers/ui-slice";
import authSlice from "./reducers/auth-slice";
import usersSlice from "./reducers/users-slice";
import rolesSlice from "./reducers/roles-slice";
import teamsSlice from "./reducers/teams-slice";
import fillerSlice from "./reducers/filler-slice";
import permissionsSlice from "./reducers/permissions-slice";
import organizationUnitsSlice from "./reducers/oragnizationalUnits-slice";
import functionalUnitSlice from "./reducers/functionalUnit-slice";
import queuesSlice from "./reducers/queues-slice";
import ticketsSlice from "./reducers/tickets-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    users: usersSlice,
    roles: rolesSlice,
    teams: teamsSlice,
    filler: fillerSlice,
    permissions: permissionsSlice,
    organizationUnits: organizationUnitsSlice,
    functionalUnit: functionalUnitSlice,
    queues: queuesSlice,
    tickets: ticketsSlice,
  },
});

export default store;
