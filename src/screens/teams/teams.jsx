import { Box, Button, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { teams } from "../../store/actions/teams";

const Teams = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
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
        dispatch(teams(isData ? data : searchData)).then((res) => {
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Teams</Typography>
                <Typography variant="body1">Manage teams and their members.</Typography>
            </Box>
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Teams;
