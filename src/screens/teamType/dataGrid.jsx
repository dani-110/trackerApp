import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import TabelContainer from "../../components/table/table";
import ModalButton from "../../components/modalButton/modalButton";
import PermissionComp from "../../components/permissionComp/permissionComp";
import TeamTypeUpdateForm from "./teamTypeUpdateForm";

const DataGrid = ({ isLoading, fetchList, teamTypes = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const dataList = teamTypes.map((row) => ({
    ...row,
    code: row.code ?? row.value ?? "",
    updatedAt: row.updatedAt
      ? moment(row.updatedAt).format("DD MMM YYYY")
      : "",
    updatedByValue: row.updatedByName ?? "-",
  }));

  const tableHeader = ["Team Type", "Code", "Updated At", "Updated By", "Is Active"];
  const verifyParam = [
    "displayValue",
    "code",
    "updatedAt",
    "updatedByValue",
    "isActive",
  ];

  return (
    <TabelContainer
      tableHeader={tableHeader}
      action={
        user?.permissions?.includes("CONFIG_MANAGE") ? TableAction : undefined
      }
      data={dataList}
      verifyParam={verifyParam}
      isLoading={isLoading}
      fetchList={fetchList}
    />
  );
};

const TableAction = ({ id: row, fetchList }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <PermissionComp name="CONFIG_MANAGE">
        <ModalButton
          open={open}
          setOpen={setOpen}
          label="Update Team Type"
          heading="Update Team Type"
          type="icon"
          startIcon={<MdEdit />}
        >
          <TeamTypeUpdateForm
            data={row}
            setOpen={setOpen}
            fetchList={fetchList}
            type="Update"
          />
        </ModalButton>
      </PermissionComp>
    </Box>
  );
};

export default DataGrid;
