import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { queues } from "../../store/actions/queues";

const Queues = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchList({})
    }, [])

    const fetchList = () => {
        dispatch(queues()).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Queues</Typography>
                <Typography variant="body1">Manage system Queues.</Typography>
            </Box>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Queues;
