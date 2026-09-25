import { Box, Button, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { users } from "../../store/actions/users";
import ModalButton from "../../components/modalButton/modalButton";
import UserCreateForm from "./userCreateForm";

const User = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState({});

    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        fetchList({})
    }, [])

    const fetchList = (data, rowsPerPage, page) => {
        if (Object.keys(data).length > 0) {
            data["pageSize"] = 10
            data["pageNo"] = 1
            setSearchData(data)
        }
        setIsLoading(true)
        const isData = Object.keys(data).length > 0
        if (rowsPerPage) {
            searchData["pageSize"] = rowsPerPage
            searchData["pageNo"] = page + 1
        }
        dispatch(users(isData ? data : searchData)).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Users</Typography>
                <Typography variant="body1">Manage system users and their access.</Typography>
            </Box>
            <ModalButton open={openCreate} setOpen={setOpenCreate} label={'Create User'} type={'button'} startIcon={<IoMdAdd />} width={'30%'}>
                <UserCreateForm  setOpen={setOpenCreate} fetchList={fetchList}/>
            </ModalButton>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default User;
