
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
import PageHeader from "../../components/pageHeader/pageHeader";
import "./ticketDetail.scss";

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
                <Typography className="ticketDetailSectionTitle">Global Screening</Typography>
            </Box>
        },
    ]

    return <Box className="screenPage ticketDetailPage">
        <PageHeader
            eyebrow="WORK MANAGEMENT / TICKETS"
            title={state?.ticketNo ? `Ticket ${state.ticketNo}` : "Ticket details"}
            description={state?.title || "Review ticket information and workflow."}
        />
        {isLoading ?
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={40} />
            </Box>
            : <Card classes="ticketDetailCard">
                <Tabs childArray={childArray} />
            </Card>}
    </Box>
};

export default TicketDetail;
