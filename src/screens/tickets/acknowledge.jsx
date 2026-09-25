
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Divider, Grid, Typography } from "@mui/material";
import WorkTypeCode from "../../components/workTypeCode/workTypeCode";
import moment from "moment";
import AcknowledgeStatus from "../../components/acknowledgeStatus/acknowledgeStatus";
import InputFields from "../../components/InputFields";
import TextAreaFields from "../../components/textAreaFields";
import Status from "../../components/status/status";
import ButtonContainer from "../../components/buttonContainer";
import ModalButton from "../../components/modalButton/modalButton";
import TicketAckApprove from "./ticketAckApprove";

const Acknowledgement = (props) => {
    const { data } = props

    const [open, setOpen] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            senderEmail: '',
            emailSubject: '',
            emailBody: '',
            supportCcEmail: '',
        },
    });

    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        reset,
        setValue,
        resetField,
        getValues,
        formState: { errors },
    } = defaultValues;

    useEffect(() => {
        reset({
            'emailBody': data?.description || '',
            'emailSubject': data?.title || '',
            'senderEmail': data?.reporterContactEmail || '',
            'supportCcEmail': data?.ccAddresses || '',
        })
    }, [])

    const ackDateByStatus = (status) => {
        switch (status) {
            case 'AWAITING_APPROVAL':
                return {
                    title: 'Last Update',
                    date: data?.updatedAt ? moment(data?.updatedAt).format('DD MMM YYYY hh:mm') : ''
                };
            case 'QUEUED':
                return {
                    title: 'Queued At',
                    date: data?.queuedAt ? moment(data?.queuedAt).format('DD MMM YYYY hh:mm') : ''
                };
            case 'FAILED':
                return {
                    title: 'Failed At',
                    date: data?.failedAt ? moment(data?.failedAt).format('DD MMM YYYY hh:mm') : ''
                };
            case 'SENT':
                return {
                    title: 'Sent At',
                    date: data?.sentAt ? moment(data?.sentAt).format('DD MMM YYYY hh:mm') : ''
                };
            default:
                return null;
        }
    }
    return <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Acknowledgement</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography variant="body1">Status</Typography>
                <AcknowledgeStatus value={data?.acknowledgementStatus || ''} />
            </Box>
        </Box>
        <Grid container spacing={1} sx={{
            display: 'flex',
            flex: 1,
            height: '100%',
            width: '100%',
            margin: 0
        }}>
            <Grid item xs={7} sx={{
                flex: 1,
                borderRight: '1px solid',
                borderColor: 'divider',
                boxSizing: 'border-box'
            }}>
                <form style={{ padding: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <InputFields
                                fieldName="senderEmail"
                                type="text"
                                label="Sender Email"
                                control={control}
                                rules={{
                                    required: "Sender Email is required",
                                }}
                                error={errors?.senderEmail}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <InputFields
                                fieldName="emailSubject"
                                type="text"
                                label="Email Subject"
                                control={control}
                                rules={{
                                    required: "Email Subject is required",
                                }}
                                error={errors?.emailSubject}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextAreaFields
                                fieldName="emailBody"
                                type="text"
                                label="Email Body"
                                control={control}
                                rules={{
                                    required: "Email Body is required",
                                }}
                                error={errors?.emailBody}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <InputFields
                                fieldName="supportCcEmail"
                                type="text"
                                label="Support CC Email"
                                control={control}
                                rules={{
                                    required: "Support CC Email is required",
                                }}
                                error={errors?.supportCcEmail}
                                disabled
                            />
                        </Grid>
                    </Grid>

                </form>
            </Grid>
            <Grid item xs={5} >
                <Typography variant="body1">Ack Version</Typography>
                <Typography variant="h4">{String(data?.communicationVersionNo || '')} </Typography>
                <Divider sx={{ margin: '10px 0px' }} />

                <Typography variant="body1">Outbox Event ID</Typography>
                <Typography variant="h4">{data?.outboxEventId || ''}</Typography>
                <Divider sx={{ margin: '10px 0px' }} />

                <Typography variant="body1">Outbox Status</Typography>
                <Status value={data?.outboxEventStatus || ''} />
                <Divider sx={{ margin: '10px 0px' }} />

                <Typography variant="body1" sx={{ margin: '10px 0px 0px' }}>Created At</Typography>
                <Typography variant="h4">{data?.createdAt ? moment(data?.createdAt).format('DD MMM YYYY hh:mm') : ''}</Typography>
                <Divider sx={{ margin: '10px 0px' }} />

                <Typography variant="body1" sx={{ margin: '10px 0px 0px' }}>{ackDateByStatus(data?.acknowledgementStatus)?.title || ''}</Typography>
                <Typography variant="h4">{ackDateByStatus(data?.acknowledgementStatus)?.date || ''}</Typography>
            </Grid>
        </Grid >
        <ButtonContainer isSingle>
            <ModalButton disabled={data?.acknowledgementStatus != 'AWAITING_APPROVAL'} open={open} setOpen={setOpen} label={'Approve Acknowledge'} heading={'Approve Acknowledgement'} type={'button'} width={'30%'}>
                <TicketAckApprove setOpen={setOpen} data={data} />
            </ModalButton>
        </ButtonContainer>
    </Box>
};

export default Acknowledgement;
