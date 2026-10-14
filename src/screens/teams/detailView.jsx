import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamsMember } from "../../store/actions/teams";
import Status from "../../components/status/status";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import MemberGrid from "./memberGrid";
import AddMemberForm from "./addMemberForm";
import { roleFiller, userFiller } from "../../store/actions/fillers";
import PageHeader from "../../components/pageHeader/pageHeader";
import PermissionComp from "../../components/permissionComp/permissionComp";

const DetailView = () => {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const [isLoader, setIsLoader] = useState(false);
  const { user } = useSelector(state => state.auth)

  const location = useLocation();
  const { state } = location;
  const allowedRoles = ['SYSTEM_ADMIN', 'SUPPORT_L1', 'SUPPORT_L2', 'SUPPORT_L3', 'TEAM_LEAD'];

  useEffect(() => {
    if (allowedRoles.some(role => user.roles.includes(role))) {
      fetchFilterData();
    } else {
      fetchList();
    }
  }, []);
  const fetchFilterData = async () => {
    setIsLoader(true);
    try {
      await Promise.all([
        dispatch(userFiller({})),
        dispatch(roleFiller({})),
      ]).then((res) => {
        fetchList();
        setIsLoader(false);
      });
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  };

  const fetchList = () => {
    dispatch(teamsMember(state.id)).then((res) => {
      if (res.payload.status == 200) {
        setDataList(res.payload.data.items);
      }
      setIsLoading(false);
    });
  };

  const activeStatus =
    state?.isActive === undefined
      ? state?.status
      : state.isActive
        ? "Active"
        : "Inactive";

  return (
    <Box className="screenPage teamDetailPage">
      <PageHeader
        eyebrow="ADMINISTRATION > TEAMS"
        title={state?.name || "Team details"}
        description={[state?.code, state?.organizationUnitName]
          .filter(Boolean)
          .join(" · ")}
        action={
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Status value={activeStatus} />
            <PermissionComp name='TEAM_MEMBER_ASSIGN'>
              <ModalButton
                open={openCreate}
                setOpen={setOpenCreate}
                label={"Add Member"}
                heading={"Assign User To Team"}
                type={"button"}
                startIcon={<IoMdAdd />}
                width={"30%"}
              >
                <AddMemberForm
                  data={state}
                  setOpen={setOpenCreate}
                  fetchList={fetchList}
                />
              </ModalButton>
            </PermissionComp>
          </Box>
        }
      />
      {isLoader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <MemberGrid
          dataList={dataList}
          isLoading={isLoading}
          fetchList={fetchList}
        />
      )}
    </Box>
  );
};
export default DetailView;
