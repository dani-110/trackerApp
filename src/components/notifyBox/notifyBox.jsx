import { Box, Button, Divider, Grid, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import React, { Children, useContext, useEffect } from "react";
import Card from "../card/Card";
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
import HeadingTitle from "../headingTitle/headingTitle";
import './notifyBox.scss'
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import ButtonContainer from "../buttonContainer";

const style = {
    top: '50%',
    left: '50%',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NotifyBox = (props) => {
    const { open, setOpen, msg, width } = props

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            {open &&
                <Box style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '0px', left: '0px', zIndex: '1000', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={{ ...style, width: width ? width : style.width }}>
                        <Card classes='notifyCardContainer' >
                            <Typography variant="h2" sx={{margin:'10px 0px'}}>
                                {msg}
                            </Typography>
                            <ButtonContainer isSingle>
                                <Button size="large" variant="text" color="primary" onClick={handleClose}>Ok</Button>
                            </ButtonContainer>
                        </Card>
                    </Box>
                </Box>
            }
        </>
    );
};

export default NotifyBox;
