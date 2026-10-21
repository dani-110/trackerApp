import { Box } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { roles } from "../../store/actions/roles";
import PageHeader from "../../components/pageHeader/pageHeader";
import PermissionComp from "../../components/permissionComp/permissionComp";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import RoleCreateForm from "./roleCreateForm";

const Roles = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

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
            action={
                <PermissionComp name='USER_CREATE'>
                    <ModalButton
                        open={openCreate}
                        setOpen={setOpenCreate}
                        label="Add Role"
                        type="button"
                        startIcon={<IoMdAdd />}
                        width="30%"
                    >
                        <RoleCreateForm setOpen={setOpenCreate} fetchList={fetchList} type={'Add'} />
                    </ModalButton>
                </PermissionComp>
            }
        />
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default Roles;
