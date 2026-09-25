import { Box, CircularProgress, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import ImageView from "./imageModal/imageModal";
import SetImageModal from "./imageModal/setImageModal";
import { useTheme } from "@emotion/react";
import edit from '../assests/edit.png'
import download from '../assests/download.png'


const ImagePicker = ({ image, setImage, imageName, setImageName, title }) => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Box style={{ height: '35px', width: '100%', border: '1px solid', borderColor: theme.palette.inputBorder, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
        <Typography sx={{ margin: '0px 0px 0px 10px' }} onClick={() => setOpen(true)}>{imageName ? imageName : title}</Typography>
        {/* {image ? <img src={image} style={{ objectFit: 'contain', height: '90%', width: '70%' }} alt="ViewImage" onClick={() => setOpen(true)} /> : <Box style={{ height: '90%', width: '70%' }}></Box>} */}
        {/* <Typography onClick={() => { setOpenUpload(true) }}>{image ? 'Change Image' : 'Select Image'}</Typography> */}
        <Box sx={{ margin: '0px 10px' }} onClick={() => { setOpenUpload(true) }}>
          {image ? <img src={edit} style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
            : <img src={download} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          }
        </Box>
      </Box>


      {open && <ImageView setOpen={setOpen} isLoading={isLoading} title={title} image={image} />}
      {openUpload && <SetImageModal title={title} setOpen={setOpenUpload} isLoading={isLoading} setImageName={(e) => setImageName(e)} submitImage={(e) => {
        setOpenUpload(false)
        setImage(e)
      }} />}
    </Box>
  );
};

export default ImagePicker;
