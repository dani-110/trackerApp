import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { getRoleUsers, roleUsers } from "../../store/actions/users";
import { roles } from "../../store/actions/roles";
import SelectFields from "../../components/SelectFields";
import DatePickerFields from "../../components/datePickerField";
import { roleFiller } from "../../store/actions/fillers";

const UserRoleForm = (props) => {
    const { data, setOpen, fetchList } = props

    const dispatch = useDispatch();
    const { rolefiller } = useSelector(state => state.filler)

    const [isLoading, setIsLoading] = useState(false);
    const [isRoleLoading, setIsRoleLoading] = useState(false);

    const defaultValues = useForm({
        defaultValues: {
            user: '',
            roleId: '',
            effectiveFrom: '',
            effectiveTo: '',
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
        setIsRoleLoading(true)
        dispatch(getRoleUsers(data.id)).then((res) => {
            if (res.payload.status == 200) {
                setValue('roleId', res.payload?.data?.items?.[0]?.roleId)
            }
            console.log(res)
            setIsLoading(false)
        });
        dispatch(roleFiller({})).then((res) => {
            setIsRoleLoading(false)
        });
    }, [])

    useEffect(() => {
        console.log(data)
        reset({
            user: data.displayName || '',
        })
    }, [])


    const submit = () => {
        setIsLoading(true)
        let obj = setDataObject(getValues())
        delete obj.user
        console.log(obj)
        const saveData = {
            obj,
            id: data.id
        }
        console.log(saveData, getValues())
        dispatch(roleUsers(saveData)).then((res) => {
            console.log(res)
            if (res.payload.status == '201') {
                setOpen(false)
                fetchList({})
            }
            setIsLoading(false)
        });
    }
    return <>
        {isRoleLoading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                <CircularProgress size={50} />
            </Box>
            : <form style={{ padding: '10px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} >
                        <InputFields
                            fieldName="user"
                            type="text"
                            label="User"
                            control={control}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <SelectFields
                            fieldName="roleId"
                            type="text"
                            label="Role"
                            control={control}
                            options={rolefiller.map(({ id, name }) => {
                                return { label: name, value: id };
                            })}
                            rules={{
                                required: "Role is required",
                            }}
                            error={errors?.roleId}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <DatePickerFields
                            fieldName="effectiveFrom"
                            type="text"
                            label="Effective From"
                            control={control}
                            rules={{
                                required: "Effective From is required",
                            }}
                            error={errors?.effectiveFrom}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <DatePickerFields
                            fieldName="effectiveTo"
                            type="text"
                            label="Effective To"
                            control={control}
                            rules={{
                                required: "Effective To is required",
                            }}
                            error={errors?.effectiveTo}
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

            </form>}
    </>
};

export default UserRoleForm;
