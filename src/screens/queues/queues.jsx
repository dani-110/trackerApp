import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { queues } from "../../store/actions/queues";
import PageHeader from "../../components/pageHeader/pageHeader";

const Queues = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchList({});
  }, []);

  const fetchList = () => {
    dispatch(queues()).then((res) => {
      setIsLoading(false);
    });
  };

  return (
    <Box className="screenPage">
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Queues"
        description=" Manage system Queues."
      />
      <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
  );
};
export default Queues;
