import React from "react";
import { Box, Typography } from "@mui/material";

const AcknowledgeStatus = ({ value }) => {
    const getBackgroundColor = (value) => {
        if (value.trim() === 'AWAITING_APPROVAL')
            return '#edc755';
        if (value.trim() === 'QUEUED')
            return '#4489e4';
        if (value.trim() === 'FAILED')
            return '#d03f3f';
        if (value.trim() === 'SENT')
            return '#3bc0c3';
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
export default AcknowledgeStatus;
