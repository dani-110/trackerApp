import React, { useState } from "react";
import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ImageView from "./imageModal/imageModal";
import { MdExpandMore, MdOutlineExpandLess } from "react-icons/md";

const StageFiveView = (props) => {
    const { title, openCollapse, viewFields, viewData, submenuExpanded, handleExpandClick, verifyParam, data } = props

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState({});
    const theme = useTheme()

    const openImage = (img, title) => {
        setOpen(true)
        setImage({ img: "data:image/pdf;base64," + img, name: title })
    }
    return <>
        <Box className="searchPermissionBar"  >
            <Typography
                variant="h4" onClick={() => handleExpandClick(openCollapse)} component="span" className="collapseableContainer" sx={{ flex: 1 }}>
                {/* {navItem.label} */}
                {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    submenuExpanded === openCollapse ? <MdOutlineExpandLess size={25} color={'#5f1ce3'} />
                        : <MdExpandMore size={25} color={'#5f1ce3'} />}
            </Box>
        </Box >
        <Collapse
            in={submenuExpanded === openCollapse}
            timeout="auto"
            unmountOnExit
        >
            <Box className='childPermissionContainer'>
                <Grid container spacing={1}>
                    {
                        viewFields.map((ele, i) => (
                            <Grid key={i} item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="h4" color={theme.palette.textColor} sx={{ textWrap: 'wrap', textAlign: 'start' }}>{ele}:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button size="medium" variant="text" color="primary" onClick={() => openImage(viewData[[verifyParam[i]]], ele)} >View</Button>

                                        {/* {e && <Typography variant="body1" sx={{ marginLeft: '10px', textWrap: 'wrap' }}>{e[[proprietorshipConcernParam[i]]]}</Typography>} */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Collapse>
        {open && <ImageView setImage={setImage} setOpen={setOpen} isLoading={false} title={image.name} image={image.img} />}
    </>

};

export default StageFiveView;
