import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { acknowledgementApprove } from "../../store/actions/tickets";
import ButtonContainer from "../../components/buttonContainer";

const TicketAckApprove = (props) => {
    const { setOpen, data } = props
    const theme = useTheme();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    const submit = () => {
        setIsLoading(true)
        const saveObj = {
            id: data?.workItemId,
            obj: {
                "acknowledgementId": data?.acknowledgementId,
                "expectedVersion": data?.communicationVersionNo
            }
        }
        dispatch(acknowledgementApprove(saveObj)).then((res) => {
            console.log(res)
            if (res.payload.status == '200') {
                setOpen(false)
            }
            setIsLoading(false)
        });
    }

    return <Box sx={{ padding: '10px' }}>
        <Typography variant="body1">Are you sure you want to approve this acknowledgement?</Typography>
        <Typography variant="body1">This will queue the email for sending.</Typography>
        <Box sx={{ margin: '10px 0px', background: theme.palette.popoverHeader, padding: '10px', borderRadius: '5px' }}>
            <Grid container spacing={1}>
                <Grid item xs={3} >
                    <Typography variant="h4">Ticket No:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h4">{data?.ticketNo}</Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography variant="body1">To:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1">{data?.reporterContactEmail}</Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant="body1">CC:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1">{data?.ccAddresses}</Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant="body1">Subject:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1">{data?.title}</Typography>
                </Grid>
            </Grid>
        </Box>
        <ButtonContainer isSingle>
            <Button disabled={isLoading} size="medium" variant="contained" color="primary" onClick={submit}>
                {isLoading && (
                    <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                )}
                Approve</Button>
        </ButtonContainer>
    </Box>
};

export default TicketAckApprove;
