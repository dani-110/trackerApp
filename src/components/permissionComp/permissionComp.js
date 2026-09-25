import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const PermissionComp = (props) => {
    const { children, list } = props

    const { user } = useSelector(state => state.auth)
    const permissions = user?.permissions

    const findPermission = () => {
        let foundPermission = null;
        list?.map((e, i) => {
            if (i == 0) {
                foundPermission = permissions?.find(val => val.PAGEPERMISSION.trim() == e)
            } else {
                foundPermission = foundPermission?.Children?.find(val => val.PAGEPERMISSION.trim() == e)
            }
        })
        return foundPermission?.ISENABLE == 1;
    }

    return (
        <>
            {findPermission() &&
                <>
                    {children}
                </>
            }
        </>
    );
};

export default PermissionComp;
