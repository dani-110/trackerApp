import React from "react";
import { useSelector } from "react-redux";

const PermissionComp = (props) => {
    const { children, name } = props

    const { user } = useSelector(state => state.auth)
    const permissions = user?.permissions

    return (
        <>
            {permissions?.includes(name) &&
                <>
                    {children}
                </>
            }
        </>
    );
};

export default PermissionComp;
