import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import SelectFields from "../../components/SelectFields";
import { useDispatch } from "react-redux";
import { alphaNumericDash, decimalRegex, idRegex, phoneRegex, setDataObject } from "../../utils/Utils";
import { createUsers } from "../../store/actions/users";

const TicketCreateForm = (props) => {
    const { setOpen, fetchList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            username: '',
            displayName: '',
            email: '',
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


    const submit = () => {
        setIsLoading(true)
        let obj = setDataObject(getValues())
        console.log(obj)
        dispatch(createUsers(obj)).then((res) => {
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
                <InputFields
                    fieldName="username"
                    type="text"
                    label="Username"
                    control={control}
                    rules={{
                        required: "Username is required",
                    }}
                    error={errors?.username}
                />
            </Grid>
            <Grid item xs={12} >
                <InputFields
                    fieldName="displayName"
                    type="text"
                    label="Display Name"
                    control={control}
                    rules={{
                        required: "Display Name is required",
                    }}
                    error={errors?.displayName}
                />
            </Grid>
            <Grid item xs={12} >
                <InputFields
                    fieldName="email"
                    type="text"
                    label="Email"
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
        </Grid>

    </form>
};

export default TicketCreateForm;
