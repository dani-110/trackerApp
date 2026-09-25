import React, { useContext } from "react";
import "./headingTitle.css";
import { Box, Breadcrumbs, Divider, IconButton, Typography } from "@mui/material";
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
import { useTheme } from "@emotion/react";
import { IoMdClose } from "react-icons/io";
const HeadingTitle = (props) => {
  const { title, handleClose } = props
  const theme = useTheme()
  const breadCrumCtxt = useContext(BreadCrumSelectorContext)
  console.log(breadCrumCtxt.breadCrumSelector)
  return <Box sx={{ width: '100%', }}>
    <Box className="titleContainer">
      <Typography variant="h3" className="headingTitle">
        {title}
      </Typography>
      <IconButton className='icon' onClick={handleClose} size="small">
        <IoMdClose color={theme.palette.textColor} size={25} />
      </IconButton>
    </Box>
  </Box>
};

export default HeadingTitle;
