import React, { useRef } from "react";
import { Box, Grid, IconButton, Modal, Switch, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { useTheme } from "@emotion/react";
import './imagePicker.scss'
import upload from '../../assests/upload.png'
import { IoMdClose } from "react-icons/io";
import Card from "../card/Card";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ImageViewer = (props) => {
    const { open, setOpen, img } = props
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        // hideBackdrop={true}
        >
            <Box style={style}>
                <Card classes='imageCard'>
                    <IconButton className='icon' onClick={handleClose} size="small">
                        <IoMdClose color="rgb(94, 53, 177)" size={25} />
                    </IconButton>
                    <img src={img} />
                </Card>
            </Box>
        </Modal>
    )
};

export default ImageViewer;
