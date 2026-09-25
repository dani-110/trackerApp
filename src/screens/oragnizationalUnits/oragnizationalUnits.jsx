import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { organizationUnits } from "../../store/actions/oragnizationalUnits";

const OragnizationalUnits = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchList({})
    }, [])

    const fetchList = () => {
        dispatch(organizationUnits()).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Oragnizational Units</Typography>
                <Typography variant="body1">Manage system Oragnizational Units.</Typography>
            </Box>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default OragnizationalUnits;
