import { Box, Button, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { users } from "../../store/actions/users";
import ModalButton from "../../components/modalButton/modalButton";
import { roles } from "../../store/actions/roles";

const Roles = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchList({})
    }, [])

    const fetchList = () => {
        dispatch(roles()).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Roles</Typography>
                <Typography variant="body1">Manage system roles.</Typography>
            </Box>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Roles;
