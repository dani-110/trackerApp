import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import { tickets } from "../../store/actions/tickets";
import TicketCreateForm from "./ticketCreateForm";

const Tickets = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [searchData, setSearchData] = useState({});

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
        dispatch(tickets(isData ? data : searchData)).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Tickets</Typography>
                <Typography variant="body1">Search and manage support tickets.</Typography>
            </Box>
            <ModalButton open={openCreate} setOpen={setOpenCreate} label={'New Ticket'} type={'button'} startIcon={<IoMdAdd />} width={'30%'}>
                <TicketCreateForm setOpen={setOpenCreate} fetchList={fetchList} />
            </ModalButton>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Tickets;
