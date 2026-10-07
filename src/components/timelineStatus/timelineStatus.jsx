import React from "react";
import { Box, Typography } from "@mui/material";

const TimelineStatus = ({ value }) => {
    const getBackgroundColor = (value) => {
        if (value?.trim()?.toLowerCase() === 'draft')
            return {
                background: '#fff4db',
                color: '#a15c00'
            };
        if (value?.trim()?.toLowerCase() === 'committed')
            return {
                background: '#e8f7ef',
                color: '#067647'
            };
        else
            return {
                background: '#f0f2f5',
                color: '#64748b'
            };
    };
    return (
        <Box sx={{
            backgroundColor: value ? getBackgroundColor(value).background : 'tansparent',
            borderRadius: '100px',
            padding: '0px 10px',
            display: 'inline-block',
            width: 'fit-content',
        }} > <Typography variant='body1' sx={{ color: getBackgroundColor(value).color, textAlign: 'center', textTransform: 'capitalize' }}>{value && value?.toLowerCase().replaceAll('_', ' ')}</Typography>
        </Box>
    )
}
export default TimelineStatus;
