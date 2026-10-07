import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, timeActivity } from "../../utils/Utils";
import SelectFields from "../../components/SelectFields";
import DatePickerFields from "../../components/datePickerField";
import { addTeamsMember } from "../../store/actions/teams";
import TextAreaFields from "../../components/textAreaFields";
import { entries, updateEntries, workSuggestions } from "../../store/actions/timesheet";
import moment from "moment";

const AddTime = (props) => {
    const { date, setOpen, fetchList, selectWorkId, selectEntries } = props

    const dispatch = useDispatch();

    const [workTypes, setWorkTypes] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(false);


    const defaultValues = useForm({
        defaultValues: {
            activityTypeCode: '',
            durationMinutes: '',
            workItemId: selectWorkId ? selectWorkId : '',
            description: '',
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
        setLoader(true)
        dispatch(workSuggestions(moment(date).format('YYYY-MM-DD'))).then((res) => {
            console.log(res.payload)
            setLoader(false)
            setWorkTypes(res.payload)
            setIsLoading(false)
        });
    }, [])

    useEffect(() => {
        console.log(selectEntries)
        if (selectEntries) {
            reset({
                activityTypeCode: selectEntries?.activityTypeCode || '',
                durationMinutes: selectEntries?.durationMinutes || '',
                workItemId: selectEntries?.workItemId || '',
                description: selectEntries?.description || '',
            })
        }
    }, [])


    const submit = () => {
        setIsLoading(true)
        const obj = {
            ...getValues(),
            workDate: moment(date).format('YYYY-MM-DD'),
            isBillable: false
        }
        console.log(obj)
        if (selectEntries) {
            obj['expectedVersion'] = selectEntries.versionNo
            console.log(selectEntries.workLogId, obj)
            const saveObj = {
                id: selectEntries.workLogId,
                obj
            }
            dispatch(updateEntries(saveObj)).then(res => {
                if (res.payload.status == '200') {
                    console.log(res)
                    setOpen(false)
                    fetchList({})
                }
                setIsLoading(false)
            })

        } else {
            dispatch(entries(obj)).then((res) => {
                console.log(res)
                if (res.payload.status == '201') {
                    setOpen(false)
                    fetchList({})
                }
                setIsLoading(false)
            });
        }
    }

    return <>
        <form style={{ padding: '10px' }}>
            {loader ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                    <CircularProgress size={50} />
                </Box>
                : <Grid container spacing={2}>

                    <Grid item xs={6} >
                        <SelectFields
                            fieldName="activityTypeCode"
                            label="Activity Type"
                            control={control}
                            options={timeActivity.map(({ value, name }) => {
                                return { label: name, value: value };
                            })}
                            rules={{
                                required: "Activity Type is required",
                            }}
                            error={errors?.activityTypeCode}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <InputFields
                            fieldName="durationMinutes"
                            label="Duration In minutes"
                            control={control}
                            rules={{
                                required: "Duration is required",
                            }}
                            error={errors?.durationMinutes}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <SelectFields
                            fieldName="workItemId"
                            label="Related Work"
                            control={control}
                            options={workTypes.map(({ workItemId, title }) => {
                                return { label: title, value: workItemId };
                            })}
                            rules={{
                                required: "Related Work is required",
                            }}
                            error={errors?.workItemId}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextAreaFields
                            fieldName="description"
                            type="text"
                            label="What did you work on?"
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
                                Save</Button>

                        </ButtonContainer>
                    </Grid>
                </Grid>}

        </form>
    </>
};

export default AddTime;
