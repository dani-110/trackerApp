import { useEffect, useState } from "react";
import TabelContainer from "../../components/table/table";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import ModalButton from "../../components/modalButton/modalButton";
import moment from "moment";
import CustomPopover from "../../components/customPopover/customPopover";
import UserEditForm from "./userEditForm";
import UserStatusForm from "./userStatusForm";
import UserRoleForm from "./userRoleForm";
import { getRoleUsers, revokeRoleUsers } from "../../store/actions/users";
import ResetPassword from "../login/resetPassword";
import { uiActions } from "../../store/reducers/ui-slice";

const DataGrid = (props) => {
  const { isLoading, fetchList } = props;
  const [dataList, setDataList] = useState([]);
  const { users, totalcount } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(users);
    let arr = [];
    users.forEach((ele) => {
      const obj = { ...ele };
      obj["createdAtValue"] = moment(ele.createdAt).format("DD MMM YYYY");
      arr.push(obj);
    });
    setDataList(arr);
  }, [users]);

  const tableHeader = ["Name", "Username", "Email", "Status", "Created At"];

  const verifyParam = [
    "displayName",
    "username",
    "email",
    "status",
    "createdAtValue",
  ];

  return (
    <>
      <TabelContainer
        tableHeader={tableHeader}
        action={TableAction}
        data={dataList}
        verifyParam={verifyParam}
        isLoading={isLoading}
        count={totalcount}
        fetchList={fetchList}
      />
    </>
  );
};
export default DataGrid;

const TableAction = (data) => {
  const item = data.id;
  const [openView, setOpenView] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [heading, setHeading] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isSystemAdmin = user?.roles?.includes("SYSTEM_ADMIN");

  const revoke = async () => {
    await dispatch(getRoleUsers(item.id)).then((res) => {
      if (res.payload.status == 200) {
        console.log(res.payload);
        if (res.payload?.data?.items?.length == 0) {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Failed!",
              message: "Please Assigned Role First!",
            }),
          );
          return;
        }
        const saveData = {
          userId: item.id,
          roleId: res.payload?.data?.items?.[0]?.roleId,
        };
        dispatch(revokeRoleUsers(saveData)).then((res) => {
          console.log(res);
          if (res.payload.status == "204") {
            data.fetchList({});
          }
        });
      }
    });
  };
  const popoverOptions = [
    {
      label: "Reset Password",
      visible: isSystemAdmin,
      onClick: () => {
        setIsResettingPassword(true);
        setModalContent(null);
        setHeading("Reset user password");
        setOpenView(true);
      },
    },
    {
      label: "Edit User",
      permission: "USER_UPDATE",
      onClick: () => {
        setIsResettingPassword(false);
        setModalContent(
          <UserEditForm
            data={item}
            setOpen={setOpenView}
            fetchList={data.fetchList}
          />,
        );
        setHeading("Edit User");
        setOpenView(true);
      },
    },
    {
      label: "Change User Status",
      permission: "USER_STATUS_CHANGE",
      onClick: () => {
        setIsResettingPassword(false);
        setModalContent(
          <UserStatusForm
            data={item}
            setOpen={setOpenView}
            fetchList={data.fetchList}
          />,
        );
        setHeading("Change User Status");
        setOpenView(true);
      },
    },
    {
      label: "Assign Role To User",
      permission: "USER_ROLE_ASSIGN",
      onClick: () => {
        setIsResettingPassword(false);
        setModalContent(
          <UserRoleForm
            data={item}
            setOpen={setOpenView}
            fetchList={data.fetchList}
          />,
        );
        setHeading("Assign Role To User");
        setOpenView(true);
      },
    },
    {
      label: "Revoke Role Confirmation",
      permission: "USER_ROLE_REMOVE",
      onClick: () => {
        revoke();
      },
    },
  ];
  return (
    <Box>
      <CustomPopover
        title="Actions"
        options={popoverOptions.filter((option) => {
          if (option.visible !== undefined) return option.visible;
          return user?.permissions?.includes(option.permission);
        })}
      />

      <ModalButton
        open={openView}
        setOpen={setOpenView}
        heading={heading}
        width={"30%"}
      >
        {isResettingPassword ? (
          <ResetPassword
            open={openView}
            user={item}
            onClose={() => setOpenView(false)}
          />
        ) : (
          modalContent
        )}
      </ModalButton>
    </Box>
  );
};
