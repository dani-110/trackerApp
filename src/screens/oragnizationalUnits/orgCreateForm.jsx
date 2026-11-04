import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { LookupsTypes, setDataObject } from "../../utils/Utils";
import { Plus } from "lucide-react";
import ToggleButton from "../../components/toggleButton/toggleButton";
import { createOrganizationUnits, updateOrganizationUnits } from "../../store/actions/oragnizationalUnits";
import { lookups } from "../../store/actions/lookups";
import SelectFields from "../../components/SelectFields";

const OrgCreateForm = (props) => {
  const { data, setOpen, fetchList, type } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [orgLoading, setOrgLoading] = useState(false);

  const defaultValues = useForm({
    defaultValues: {
      parentId: "",
      code: "",
      name: "",
      unitType: "organization",
      managerUserId: ""
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = defaultValues;


  useEffect(() => {
    setOrgLoading(true)
    dispatch(lookups(LookupsTypes.USER)).then(res => {
      if (res.payload?.status == '200') {
        setUsers(res.payload?.data);
      }
      setOrgLoading(false)
    })
    console.log(data)
    if (data?.id) {
      reset({
        code: data.code,
        name: data.name,
        managerUserId: data.managerUserId,
        isActive: data.isActive
      })
    }
  }, []);



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
        orgId: data.id
      }
      dispatch(updateOrganizationUnits(saveObj)).then((res) => {
        console.log(res);
        if (res.payload.status == "200") {
          setOpen(false);
          fetchList({});
        }
        setIsLoading(false);
      });
    } else {
      dispatch(createOrganizationUnits(obj)).then((res) => {
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
      {orgLoading ?
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
              placeholder="e.g Support"
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
              placeholder="e.g Support"
              control={control}
              rules={{
                required: "Name is required",
              }}
              error={errors?.name}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFields
              fieldName="managerUserId"
              label="Manager User"
              control={control}
              options={users.map(({ displayValue, value }) => {
                return { label: displayValue, value: value };
              })}
              rules={{
                required: "Manager User is required",
              }}
              error={errors?.managerUserId}
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
                {`${type} Organization`}
              </Button>
            </ButtonContainer>
          </Grid>
        </Grid>}
    </form>
  );
};

export default OrgCreateForm;
