import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@mui/material";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { changeStatusUsers } from "../../store/actions/users";
import SelectFields from "../../components/SelectFields";

const UserStatusForm = (props) => {
    const { data, setOpen, fetchList } = props

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            status: '',
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
            status: data.status || '',
            expectedVersion: data.versionNo || '',
        })
    }, [])

    const status = ["ACTIVE", "PENDING", "DISABLED", "LOCKED"]


    const submit = () => {
        setIsLoading(true)
        let obj = setDataObject(getValues())
        console.log(obj)
        const saveData = {
            obj,
            id: data.id
        }
        dispatch(changeStatusUsers(saveData)).then((res) => {
            console.log(res)
            if (res.payload.status == '204') {
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
                    fieldName="status"
                    type="text"
                    label="New Status"
                    control={control}
                    options={status.map((e) => {
                        return { label: e, value: e };
                    })}
                    rules={{
                        required: "New Status is required",
                    }}
                    error={errors?.status}
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

export default UserStatusForm;
