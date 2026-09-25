import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { permissions } from "../../store/actions/permissions";

const Permissions = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchList({})
    }, [])

    const fetchList = () => {
        dispatch(permissions()).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Permissions</Typography>
                <Typography variant="body1">Manage system permissions.</Typography>
            </Box>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Permissions;
