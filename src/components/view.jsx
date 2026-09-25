import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Logo from "./logo/logo";

const View = (props) => {
    const { viewFields, viewData, verifyParam, data } = props
    const theme = useTheme()
    return <Grid container spacing={1}>
        {
            viewFields.map((e, i) => (
                <Grid key={i} item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" color={theme.palette.textColor}>{e}:</Typography>
                    {viewData && (verifyParam[i]?.includes('logo')) ?
                        <Logo value={viewData[[verifyParam[i]]]} /> :
                        <Typography variant="body1" sx={{ marginLeft: '10px', textAlign: 'left', wordBreak: 'break-word', whiteSpace: 'normal' }}>{viewData[[verifyParam[i]]]}</Typography>}
                </Grid>
            ))
        }
    </Grid>

};

export default View;
