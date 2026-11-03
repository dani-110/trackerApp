import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import { useDispatch } from "react-redux";
import { LookupsTypes, setDataObject } from "../../utils/Utils";
import { Plus } from "lucide-react";
import TextAreaFields from "../../components/textAreaFields";
import MultiSelectFields from "../../components/MultiSelectFields";
import { createRoles, updateRoles } from "../../store/actions/roles";
import ToggleButton from "../../components/toggleButton/toggleButton";
import { lookups } from "../../store/actions/lookups";
import SelectFields from "../../components/SelectFields";
import { createTeam, updateTeam } from "../../store/actions/teams";

const TeamCreateForm = (props) => {
  const { data, setOpen, fetchList, type } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [teamType, setTeamType] = useState([]);

  const defaultValues = useForm({
    defaultValues: {
      organizationUnitId: "",
      code: "",
      name: "",
      teamType: "",
      leadUserId: ""
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
    fetchAllLookups();
    console.log(data)
    if (data?.id) {
      reset({
        organizationUnitId: data.organizationUnitId,
        code: data.code,
        name: data.name,
        description: data.description,
        teamType: data.teamType,
        isActive: data.isActive,
        leadUserId: data.leadUserId,
        // permissionIds: []
      })
    }
  }, []);

  const fetchAllLookups = () => {
    setTeamLoading(true);

    Promise.all([
      dispatch(lookups(LookupsTypes.USER)),
      dispatch(lookups(LookupsTypes.ORGANIZATION)),
      dispatch(lookups(LookupsTypes.TEAM_TYPE))
    ])
      .then(([userRes, orgRes, teamTypeRes]) => {
        if (userRes.payload?.status == '200') {
          setUsers(userRes.payload?.data);
        }
        if (orgRes.payload?.status == '200') {
          setOrganization(orgRes.payload?.data);
        }
        if (teamTypeRes.payload?.status == '200') {
          setTeamType(teamTypeRes.payload?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching lookups:", error);
      })
      .finally(() => {
        setTeamLoading(false);
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
        teamId: data.id
      }
      dispatch(updateTeam(saveObj)).then((res) => {
        console.log(res);
        if (res.payload.status == "200") {
          setOpen(false);
          fetchList({});
        }
        setIsLoading(false);
      });
    } else {
      dispatch(createTeam(obj)).then((res) => {
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
      {teamLoading ?
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="secondary" size={40} />
        </Box>
        : <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectFields
              fieldName="organizationUnitId"
              label="Organization Unit"
              control={control}
              options={organization.map(({ displayValue, value }) => {
                return { label: displayValue, value: value };
              })}
              disabled={type == 'Update'}
              rules={{
                required: "Organization Unit is required",
              }}
              error={errors?.organizationUnitId}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFields
              fieldName="code"
              type="text"
              label="Code"
              control={control}
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
              control={control}
              rules={{
                required: "Name is required",
              }}
              error={errors?.name}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFields
              fieldName="teamType"
              label="Team Type"
              control={control}
              options={teamType.map(({ displayValue, value }) => {
                return { label: displayValue, value: value };
              })}
              rules={{
                required: "Team Type is required",
              }}
              error={errors?.teamType}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFields
              fieldName="leadUserId"
              label="Lead User"
              control={control}
              options={users.map(({ displayValue, value }) => {
                return { label: displayValue, value: value };
              })}
              rules={{
                required: "Lead User is required",
              }}
              error={errors?.leadUserId}
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

export default TeamCreateForm;
