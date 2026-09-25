import { Box, Button, Divider, Grid, IconButton, Modal, Tooltip, Typography, useTheme } from "@mui/material";
import React, { Children, useContext, useEffect } from "react";
import Card from "../card/Card";
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
import HeadingTitle from "../headingTitle/headingTitle";
import './modalButton.scss'
import { IoIosArrowForward } from "react-icons/io";

const style = {
    top: '50%',
    left: '50%',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ModalButton = (props) => {
    const { children, heading, isOpen, showError, open, setOpen, label, img, type, width, startIcon, endIcon, disabled } = props
    const theme = useTheme()
    const breadCrumCtxt = useContext(BreadCrumSelectorContext)

    const handleOpen = () => {
        breadCrumCtxt.breadCrumSelectorAddHandler(label);
        if (showError) {
            if (isOpen)
                setOpen(true)
            else {
                showError()
            }
        } else {
            setOpen(true)
        }
    }
    const handleClose = () => {
        breadCrumCtxt.breadCrumSelectorRemoveHandler(label);
        setOpen(false)
    }


    return (
        <>
            {type && <>
                {type == 'button' ?
                    <Button size="medium" variant="contained" color="primary" sx={{ margin: '0px 0px 10px', background: '#1880e1' }} onClick={handleOpen} disabled={disabled} startIcon={startIcon ? startIcon : null} endIcon={endIcon ? endIcon : null}> {label}</Button >
                    :
                    <Tooltip title={label}>
                        <IconButton onClick={handleOpen} sx={{ width: '40px', margin: '0px auto' }}>
                            {startIcon ? startIcon : endIcon ? endIcon : null}
                        </IconButton>
                    </Tooltip>

                }
            </>}
            {
                open && <Box style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0px', left: '0px', zIndex: '1300', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={{ ...style, width: width ? width : style.width }}>
                        <Card classes='modalCardContainer' >
                            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.palette.popoverHeader, padding: '5px', }}>
                                <HeadingTitle title={heading ? heading : label} handleClose={handleClose} />

                            </Box>
                            {children}
                        </Card>
                    </Box>
                </Box>
            }
        </>
    );
};

export default ModalButton;
