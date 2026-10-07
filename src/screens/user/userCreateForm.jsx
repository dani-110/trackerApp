import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { createUsers } from "../../store/actions/users";
import { Plus } from "lucide-react";

const UserCreateForm = (props) => {
  const { setOpen, fetchList } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = useForm({
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
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
    setIsLoading(true);
    let obj = setDataObject(getValues());
    console.log(obj);
    dispatch(createUsers(obj)).then((res) => {
      console.log(res);
      if (res.payload.status == "201") {
        setOpen(false);
        fetchList({});
      }
      setIsLoading(false);
    });
  };

  return (
    <form style={{ padding: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFields
            fieldName="username"
            type="text"
            label="Username"
            control={control}
            placeholder="e.g jhon doe"
            rules={{
              required: "Username is required",
            }}
            error={errors?.username}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="displayName"
            type="text"
            label="Display Name"
            placeholder="e.g Jhon Doe"
            control={control}
            rules={{
              required: "Display Name is required",
            }}
            error={errors?.displayName}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="email"
            type="text"
            label="Email"
            placeholder="name@company.com"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            error={errors?.email}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonContainer isSingle>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              size="medium"
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleSubmit(submit)}
            >
              <Plus size={16} style={{ marginRight: 8 }} />
              Create user
            </Button>
          </ButtonContainer>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserCreateForm;
