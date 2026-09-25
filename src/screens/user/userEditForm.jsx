import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { editUsers } from "../../store/actions/users";

const UserEditForm = (props) => {
    const { data, setOpen, fetchList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            displayName: '',
            email: '',
            externalSubject: null,
            expectedVersion: 0,
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
        console.log(data)
        reset({
            displayName: data.displayName || '',
            email: data.email || '',
            externalSubject: data.externalSubject || '',
            expectedVersion: data.versionNo || '',
        })
    }, [])


    const submit = () => {
        setIsLoading(true)
        let obj = setDataObject(getValues())
        console.log(obj)
        const saveData = {
            obj,
            id: data.id
        }
        dispatch(editUsers(saveData)).then((res) => {
            console.log(res)
            if (res.payload.status == '200') {
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
            <Grid item xs={12} >
                <InputFields
                    fieldName="externalSubject"
                    type="text"
                    label="External Subject"
                    control={control}
                />
            </Grid>
            {/* <Grid item xs={12} >
                <InputFields
                    fieldName="expectedVersion"
                    type="number"
                    label="Expected Version"
                    control={control}
                />
            </Grid> */}
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

export default UserEditForm;
