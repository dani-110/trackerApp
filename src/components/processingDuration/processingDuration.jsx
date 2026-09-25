import React from "react";
import { Box, Typography } from "@mui/material";

const ProcessingDuration = ({ value }) => {
    return (
        <Box sx={{
            minHeight: '25px',
            borderRadius: '10px',
            gap: '10px',
            alignItems: 'center',
            display: 'flex',
            justifyContent:'center'
        }} >
            <Typography sx={{ color: value ? value === '24 Hours' ? 'rgb(19, 222, 185)' : '#ee4f32' : "#000", textAlign: 'left' }}>{value}</Typography>
        </Box>
    )
}

export default ProcessingDuration;
