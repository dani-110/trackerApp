import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, CircularProgress, Grid } from "@mui/material";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import InputFields from "../../components/InputFields";
import ButtonContainer from "../../components/buttonContainer";
import ToggleButton from "../../components/toggleButton/toggleButton";
import { teamType, updateTeamType } from "../../store/actions/teamType";

const TeamTypeUpdateForm = ({ data, setOpen, fetchList, type }) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(type === "Update");
  const [expectedVersion, setExpectedVersion] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const code = data?.code ?? data?.value ?? "";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code,
      displayValue: "",
      isActive: data?.isActive ?? true,
      sortOrder: "",
    },
  });

  useEffect(() => {
    if (type !== "Update") {
      setIsFetching(false);
      return;
    }

    if (!code) {
      setFetchError("The selected team type does not include a code.");
      setIsFetching(false);
      return;
    }

    dispatch(teamType(code))
      .then((res) => {
        if (res.payload?.status === 200) {
          const detail = res.payload.data;
          reset({
            code: detail.code ?? code,
            displayValue: "",
            isActive: detail.isActive ?? data?.isActive ?? true,
            sortOrder: "",
          });
          setExpectedVersion(detail.versionNo ?? null);
        } else {
          setFetchError(
            res.payload?.data?.detail ??
              "Could not load team type details. Check the team type GET endpoint and code."
          );
        }
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, type, code, data, reset]);

  const submit = (values) => {
    const payload = {
      code: values.code || code,
      displayValue: values.displayValue,
      isActive: values.isActive,
      sortOrder: Number(values.sortOrder),
      expectedVersion: type === "Update" ? expectedVersion : 0,
    };

    setIsSaving(true);
    dispatch(updateTeamType(payload))
      .then((res) => {
        if (res.payload?.status === 200) {
          setOpen(false);
          fetchList({});
        }
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <form style={{ padding: "10px" }}>
      {fetchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {fetchError}
        </Alert>
      )}
      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <CircularProgress color="secondary" size={28} />
        </Box>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFields
            fieldName="code"
            type="text"
            label="Code"
            control={control}
            disabled={type === "Update"}
            rules={{ required: "Code is required" }}
            error={errors?.code}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="displayValue"
            type="text"
            label="Display Value"
            control={control}
            rules={{ required: "Display Value is required" }}
            error={errors?.displayValue}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            fieldName="sortOrder"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            label="Sort Order"
            control={control}
            rules={{ required: "Sort Order is required" }}
            error={errors?.sortOrder}
          />
        </Grid>
        {type === "Update" && (
          <Grid item xs={12}>
            <ToggleButton
              fieldName="isActive"
              label="Is Active"
              control={control}
              noBorder
            />
          </Grid>
        )}
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
              disabled={
                isSaving ||
                isFetching ||
                (type === "Update" && expectedVersion == null)
              }
              onClick={handleSubmit(submit)}
            >
              <Plus size={16} style={{ marginRight: 8 }} />
              {type === "Add" ? "Create Team Type" : "Update Team Type"}
            </Button>
          </ButtonContainer>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeamTypeUpdateForm;
