import React from "react";
import { Box, Typography } from "@mui/material";

const Status = ({ value }) => {
    const getBackgroundColor = (value) => {
        if (value.trim().toLowerCase() === 'active')
            return '#3bc0c3';
        if (value.trim().toLowerCase() === 'pending')
            return '#edc755';
        if (value.trim().toLowerCase() === 'disabled')
            return '#d03f3f';
        if (value.trim().toLowerCase() === 'locked')
            return '#33b0e0';
        else
            return '#d03f3f';
    };
    return (
        <Box sx={{
            backgroundColor: value ? getBackgroundColor(value) : 'tansparent',
            borderRadius: '5px',
            padding: '0px 10px'
        }} > <Typography variant='body1' sx={{ color: "#fff", textAlign: 'center' }}>{value}</Typography>
        </Box>
    )
}
export default Status;
