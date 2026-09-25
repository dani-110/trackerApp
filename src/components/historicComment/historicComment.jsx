import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

const HistoricComment = ({ value }) => {
    return (
        value ? <Tooltip title={value}>
            <Typography variant='body1' sx={{
                color: '#6f6e6e',
                borderRadius: '100px',
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
            }}>{value}</Typography>
        </Tooltip> : null
    )
}
export default HistoricComment;

