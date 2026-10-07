import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { functionalUnit } from "../../store/actions/functionalUnit";
import PageHeader from "../../components/pageHeader/pageHeader";

const FunctionalUnit = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchList({});
  }, []);

  const fetchList = () => {
    dispatch(functionalUnit()).then((res) => {
      setIsLoading(false);
    });
  };

  return (
     <Box className="screenPage">
        <PageHeader
            eyebrow="ADMINISTRATION"
            title="Functional Units"
            description=" Manage system Functional Units."
        />
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
  );
};
export default FunctionalUnit;
