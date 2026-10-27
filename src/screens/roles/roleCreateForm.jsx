import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { setDataObject } from "../../utils/Utils";
import { Plus } from "lucide-react";
import TextAreaFields from "../../components/textAreaFields";
import MultiSelectFields from "../../components/MultiSelectFields";
import { createRoles, rolesPermissions, updateRoles } from "../../store/actions/roles";
import ToggleButton from "../../components/toggleButton/toggleButton";

const RoleCreateForm = (props) => {
  const { data, setOpen, fetchList, type } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const defaultValues = useForm({
    defaultValues: {
      code: "",
      name: "",
      description: "",
      permissionIds: []
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
    rolesList();
    console.log(data)
    if (data?.id) {
      reset({
        code: data.code,
        name: data.name,
        description: data.description,
        isActive: data.isActive
        // permissionIds: []
      })
    }
  }, []);

  const rolesList = () => {
    setRoleLoading(true)
    dispatch(rolesPermissions(data?.id ? data.id : '')).then((res) => {
      if (data?.id) {
        setValue('permissionIds', res?.payload?.list?.filter(val => val?.isAssigned)?.map(ele => ele?.permissionId))
      }
      setRoles(res?.payload?.list)
      setRoleLoading(false);
    });
  };


  const submit = () => {
    console.log(getValues())
    setIsLoading(true);
    let obj = setDataObject(getValues());
    console.log(obj);
    if (data?.id) {
      delete obj.code
      obj['expectedVersion'] = data.versionNo
      console.log(obj)
      const saveObj = {
        obj,
        roleId: data.id
      }
      dispatch(updateRoles(saveObj)).then((res) => {
        console.log(res);
        if (res.payload.status == "200") {
          setOpen(false);
          fetchList({});
        }
        setIsLoading(false);
      });
    } else {
      dispatch(createRoles(obj)).then((res) => {
        console.log(res);
        if (res.payload.status == "201") {
          setOpen(false);
          fetchList({});
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <form style={{ padding: "10px" }}>
      {roleLoading ?
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="secondary" size={40} />
        </Box>
        : <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputFields
              fieldName="code"
              type="text"
              label="Code"
              control={control}
              placeholder="e.g DEPLOYMENT_APPROVER"
              disabled={type == 'Update'}
              rules={{
                required: "Code is required",
              }}
              error={errors?.code}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFields
              fieldName="name"
              type="text"
              label="Name"
              placeholder="e.g Deployment Approver"
              control={control}
              rules={{
                required: "Name is required",
              }}
              error={errors?.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextAreaFields
              fieldName="description"
              type="text"
              label="Description"
              placeholder="role description"
              control={control}
              rules={{
                required: "Description is required",
              }}
              error={errors?.description}
            />
          </Grid>
          <Grid item xs={12}>
            <MultiSelectFields
              fieldName="permissionIds"
              label="Permissions"
              control={control}
              options={roles.map(({ permissionName, permissionId }) => {
                return { label: permissionName, value: permissionId };
              })}
              rules={{
                required: "Permissions is required",
              }}
              error={errors?.permissionIds}
            />
          </Grid>
          {type == 'Update' && <Grid item xs={12}>
            <ToggleButton
              fieldName="isActive"
              lable="Is Active"
              control={control}
              noBorder
            />
          </Grid>}
          <Grid item xs={12}>
            <ButtonContainer>
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
                {`${type} Role`}
              </Button>
            </ButtonContainer>
          </Grid>
        </Grid>}
    </form>
  );
};

export default RoleCreateForm;
