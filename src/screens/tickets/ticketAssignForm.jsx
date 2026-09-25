import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import ButtonContainer from "../../components/buttonContainer";
import SelectFields from "../../components/SelectFields";
import { useDispatch } from "react-redux";
import { ticketAssignment, ticketClassification } from "../../store/actions/tickets";
import InputFields from "../../components/InputFields";
import TextAreaFields from "../../components/textAreaFields";
import { setDataObject } from "../../utils/Utils";
import { teams } from "../../store/actions/teams";

const TicketAssignForm = (props) => {
    const { data, setOpen, fetchList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isTeamLoading, setIsTeamLoading] = useState(false);
    const [teamList, setTeamList] = useState([]);

    const defaultValues = useForm({
        defaultValues: {
            teamId: '',
            assignmentReasonCode: '',
            assignmentComment: '',
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
        setIsTeamLoading(true)
        const obj = {
            pageSize: 1000,
            pageNo: 1
        }
        dispatch(teams(obj)).then((res) => {
            setTeamList(res.payload.list)
            setIsTeamLoading(false)
        });
    }, [])

    const submit = () => {
        setIsLoading(true)
        const saveObj = {
            id: data?.workItemId,
            obj: {
                ...setDataObject(getValues()),
                "expectedVersion": data?.versionNo
            }
        }
        dispatch(ticketAssignment(saveObj)).then((res) => {
            console.log(res)
            if (res.payload.status == '200') {
                setOpen(false)
                fetchList({})
            }
            setIsLoading(false)
        });
    }

    return <>
        {isTeamLoading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                <CircularProgress size={50} />
            </Box>
            : <form style={{ padding: '10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <SelectFields
                            fieldName="teamId"
                            type="text"
                            label="Team"
                            control={control}
                            options={teamList?.map(({ id, name }) => {
                                return { label: name, value: id };
                            })}
                            rules={{
                                required: "Team is required",
                            }}
                            error={errors?.teamId}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <InputFields
                            fieldName="assignmentReasonCode"
                            type="text"
                            label="Reason"
                            control={control}
                            rules={{
                                required: "Reason is required",
                            }}
                            error={errors?.assignmentReasonCode}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextAreaFields
                            fieldName="assignmentComment"
                            type="text"
                            label="Comment"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonContainer isSingle>
                            <Button size="medium" variant="contained" color="primary" disabled={isLoading}
                                onClick={handleSubmit(submit)}>
                                {isLoading && (
                                    <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                                )}
                                Assign Team</Button>

                        </ButtonContainer>
                    </Grid>
                </Grid>

            </form>
        }
    </>
};

export default TicketAssignForm;
