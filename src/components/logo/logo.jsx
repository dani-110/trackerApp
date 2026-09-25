import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = ({ value }) => {
    return (
        value?<img src={value} style={{height:'50px', width:'100px',objectFit: 'contain'}}/>:null
    )
}
export default Logo;

