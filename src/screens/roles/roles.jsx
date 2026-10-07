import { Box } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { roles } from "../../store/actions/roles";
import PageHeader from "../../components/pageHeader/pageHeader";

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

    return <Box className="screenPage">
        <PageHeader
            eyebrow="ADMINISTRATION"
            title="Roles"
            description="Manage system roles."
        />
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Roles;
