import React from "react";
import { Box, Typography } from "@mui/material";

const WorkTypeCode = ({ value }) => {
    const getBackgroundColor = (value) => {
        if (value.trim() === 'UNCLASSIFIED')
            return '#b7b7bf';
        if (value.trim() === 'CHANGE_REQUEST')
            return '#eb701e';
        if (value.trim() === 'BUG')
            return '#d03f3f';
        if (value.trim() === 'SUPPORT_CASE')
            return '#4489e4';
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
export default WorkTypeCode;
