import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@mui/material";
import ButtonContainer from "../../components/buttonContainer";
import SelectFields from "../../components/SelectFields";
import { useDispatch } from "react-redux";
import { createTickets, ticketClassification } from "../../store/actions/tickets";

const TicketClassifyForm = (props) => {
    const { data, setOpen, fetchList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            workTypeCode: '',
        },
    });

    const workType = ['UNCLASSIFIED', 'CHANGE_REQUEST', 'BUG', 'SUPPORT_CASE']

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
        setValue('workTypeCode', data?.workTypeCode || '')
    }, [])

    const submit = () => {
        setIsLoading(true)
        const saveObj = {
            id: data?.workItemId,
            obj: {
                "workTypeCode": watch('workTypeCode'),
                "expectedVersion": data?.versionNo
            }
        }
        console.log(saveObj, data)

        dispatch(ticketClassification(saveObj)).then((res) => {
            console.log(res)
            if (res.payload.status == '201') {
                setOpen(false)
                fetchList({})
            }
            setIsLoading(false)
        });
    }

    return <form style={{ padding: '10px' }}>
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <SelectFields
                    fieldName="workTypeCode"
                    type="text"
                    label="Classification"
                    control={control}
                    options={workType.map((e) => {
                        return { label: e, value: e };
                    })}
                    rules={{
                        required: "Classification is required",
                    }}
                    error={errors?.workTypeCode}
                />
            </Grid>
            <Grid item xs={12}>
                <ButtonContainer isSingle>
                    <Button size="medium" variant="contained" color="primary" disabled={isLoading}
                        onClick={handleSubmit(submit)}>
                        {isLoading && (
                            <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                        )}
                        Update Classify</Button>

                </ButtonContainer>
            </Grid>
        </Grid>

    </form>
};

export default TicketClassifyForm;
