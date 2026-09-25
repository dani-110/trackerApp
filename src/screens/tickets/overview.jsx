
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Divider, Grid, Typography } from "@mui/material";
import WorkTypeCode from "../../components/workTypeCode/workTypeCode";
import moment from "moment";

const Overview = (props) => {
    const { data } = props
    console.log(data)

    return <Grid container spacing={1} sx={{
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        margin: 0
    }}>
        <Grid item xs={7} sx={{
            height: '100%',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxSizing: 'border-box'
        }}>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Ticket Information</Typography>
            <Typography variant="body1">Description</Typography>
            <Typography variant="h4">{data?.description || ''}</Typography>

            <Typography variant="body1" sx={{ margin: '10px 0px 0px' }}>Source Channel</Typography>
            <Typography variant="h4">{data?.sourceChannel || ''}</Typography>
            <Divider sx={{ margin: '10px 0px' }} />

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Typography variant="body1" sx={{ margin: '10px 0px 0px' }}>Created At</Typography>
                    <Typography variant="h4">{data?.createdAt ? moment(data.createdAt).format('DD MMM YYYY hh:mm') : ''}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant="body1" sx={{ margin: '10px 0px 0px' }}>Last Update</Typography>
                    <Typography variant="h4">{data?.updatedAt ? moment(data.updatedAt).format('DD MMM YYYY hh:mm') : ''}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={5} >
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Workflow</Typography>
            <Typography variant="body1">Workflow</Typography>
            <WorkTypeCode value={data?.workTypeCode || ''} />
            <Divider sx={{ margin: '10px 0px' }} />

            <Typography variant="body1">State</Typography>
            <Typography variant="h4">{data?.stateName || ''}</Typography>
            <Divider sx={{ margin: '10px 0px' }} />

            <Typography variant="body1">Version</Typography>
            <Typography variant="h4">{String(data?.workItemVersionNo) || ''}</Typography>
        </Grid>
    </Grid >
};

export default Overview;
