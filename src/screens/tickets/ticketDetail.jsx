
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, CircularProgress, Typography } from "@mui/material";
import Tabs from "../../components/tabs/tabs";
import Card from "../../components/card/Card";
import Overview from "./overview";
import { useLocation } from "react-router-dom";
import Acknowledgement from "./acknowledge";
import { useDispatch } from "react-redux";
import { ticketById } from "../../store/actions/tickets";

const TicketDetail = () => {
    const location = useLocation()
    const { state } = location

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [ticketData, setticketData] = useState({});

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        setIsLoading(true)
        dispatch(ticketById(state.workItemId)).then((res) => {
            setticketData(res.payload)
            setIsLoading(false)
        });
    }

    const childArray = [
        {
            label: "Overview",
            component: <Overview data={ticketData} />
        },
        {
            label: "Acknowledgement",
            component: <Acknowledgement data={ticketData} />
        },
        {
            label: "Global Screening",
            component: <Box>
                <Typography>Global Screening</Typography>
            </Box>
        },
    ]

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        {isLoading ?
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={40} />
            </Box>
            : <Card>
                <Tabs childArray={childArray} />
            </Card>}
    </Box>
};

export default TicketDetail;
