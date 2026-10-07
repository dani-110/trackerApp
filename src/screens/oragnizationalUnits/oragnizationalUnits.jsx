import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { organizationUnits } from "../../store/actions/oragnizationalUnits";
import PageHeader from "../../components/pageHeader/pageHeader";

const OragnizationalUnits = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchList({});
  }, []);

  const fetchList = () => {
    dispatch(organizationUnits()).then((res) => {
      setIsLoading(false);
    });
  };

  return (
    <Box className="screenPage">
        <PageHeader
            eyebrow="ADMINISTRATION"
            title="Oragnizational Units"
            description=" Manage system Oragnizational Units."
        />
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
    
  );
};
export default OragnizationalUnits;
