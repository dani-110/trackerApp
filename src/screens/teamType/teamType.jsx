import { Box } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lookups } from "../../store/actions/lookups";
import { teamType as getTeamType } from "../../store/actions/teamType";
import { LookupsTypes } from "../../utils/Utils";
import PageHeader from "../../components/pageHeader/pageHeader";
import PermissionComp from "../../components/permissionComp/permissionComp";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import TeamTypeUpdateForm from "./teamTypeUpdateForm";

const Teams = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [teamType, setTeamType] = useState([]);

  useEffect(() => {
    fetchList({});
  }, []);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const [res, usersRes] = await Promise.all([
        dispatch(lookups(LookupsTypes.TEAM_TYPE)),
        dispatch(lookups(LookupsTypes.USER)),
      ]);
      if (res.payload?.status === 200) {
        const lookupRows = res.payload.data ?? [];
        const users = usersRes.payload?.data ?? [];
        const rowsWithDetails = await Promise.all(
          lookupRows.map(async (row) => {
            const code = row.code ?? row.value;
            if (!code) return row;

            const detailRes = await dispatch(getTeamType(code));
            const detail =
              detailRes.payload?.status === 200
                ? detailRes.payload.data
                : null;

            const updatedByUser = detail?.updatedBy == null
              ? null
              : users.find(
                  (user) =>
                    String(user.value) === String(detail.updatedBy)
                );

            return {
              ...row,
              ...(detail ?? {}),
              code: detail?.code ?? code,
              updatedByName: updatedByUser?.displayValue ?? "-",
            };
          })
        );
        setTeamType(rowsWithDetails);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="screenPage">
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Team Types"
        description="Manage team types"
        action={
          <PermissionComp name="CONFIG_MANAGE">
            <ModalButton
              open={openUpdate}
              setOpen={setOpenUpdate}
              label="Add Team Type"
              type="button"
              startIcon={<IoMdAdd />}
              width="30%"
            >
              <TeamTypeUpdateForm
                setOpen={setOpenUpdate}
                fetchList={fetchList}
                type={"Add"}
              />
            </ModalButton>
          </PermissionComp>
        }
      />
      <DataGrid
        fetchList={fetchList}
        isLoading={isLoading}
        teamTypes={teamType}
      />
    </Box>
  );
};
export default Teams;
