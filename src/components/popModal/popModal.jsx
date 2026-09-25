import { Box } from "@mui/material";
import React from "react";
import Card from "../card/Card";
import './popModal.scss'

const style = {
    top: '50%',
    left: '50%',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PopModal = (props) => {
    const { children, open, setOpen, width } = props

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            {open && <Box style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '0px', left: '0px', zIndex: '1000', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Box style={{ ...style, width: width ? width : style.width }}>
                    <Card classes='popModalCardContainer' >
                        {children}
                    </Card>
                </Box>
            </Box>}
        </>
    );
};

export default PopModal;
