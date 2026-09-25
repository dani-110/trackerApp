import React, { useRef, useState } from "react";
import { Box, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Card from "../card/Card";

const ImageView = (props) => {
    const { setOpen, isLoading, title, image } = props
    const style = {
        top: '50%',
        left: '50%',
        width: '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '0px', left: '0px', zIndex: '1000', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Box style={style}>
                <Card >
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography variant="h2" sx={{ textWrap: 'wrap' }}>{title}</Typography>
                        <IconButton size="large" onClick={() => {
                            setOpen(false)
                        }}>
                            <IoMdClose color="rgb(94, 53, 177)" size={25} />
                        </IconButton>
                    </Box>
                    <Divider sx={{ margin: '10px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        {
                            isLoading ? <Box className='tableLoadingContainer'>
                                <CircularProgress color='secondary' size={50} sx={{ margin: '20px' }} />
                            </Box> :
                                <img src={image} style={{ height: '50vh', objectFit: 'contain' }} alt="ViewImage" />
                        }
                    </Box>
                </Card>
            </Box>
        </Box>
    )
};

export default ImageView;
