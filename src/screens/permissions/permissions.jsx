import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { permissions } from "../../store/actions/permissions";
import PageHeader from "../../components/pageHeader/pageHeader";

const Permissions = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchList({});
  }, []);

  const fetchList = () => {
    dispatch(permissions()).then((res) => {
      setIsLoading(false);
    });
  };

  return (
    <Box className="screenPage">
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Permissions"
        description=" Manage system permissions."
      />
      <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
  );
};
export default Permissions;
