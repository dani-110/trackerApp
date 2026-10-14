import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import ButtonContainer from "../../components/buttonContainer";
import SelectFields from "../../components/SelectFields";
import { useDispatch, useSelector } from "react-redux";
import {
  assignmentReasons,
  ticketAssignment,
  ticketClassification,
} from "../../store/actions/tickets";
import InputFields from "../../components/InputFields";
import TextAreaFields from "../../components/textAreaFields";
import { setDataObject } from "../../utils/Utils";
import { teams } from "../../store/actions/teams";

const TicketAssignForm = (props) => {
  const { data, setOpen, fetchList } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [reasonList, setReasonList] = useState([]);

  const { user } = useSelector(state => state.auth)

  const defaultValues = useForm({
    defaultValues: {
      teamId: "",
      assignmentReasonCode: "",
      assignmentComment: "",
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
    setIsTeamLoading(true);
    const obj = {
      pageSize: 1000,
      pageNo: 1,
    };
    dispatch(teams(obj)).then((res) => {
      setTeamList(res.payload.list);
      setIsTeamLoading(false);
    });
    getAssignReasons();
  }, []);

  const getAssignReasons = () => {
    const allowedRoles = ['SYSTEM_ADMIN', 'SUPPORT_L1', 'SUPPORT_L2', 'SUPPORT_L3'];

    const hasAccess = allowedRoles.some(role => user.roles.includes(role));
    console.log(hasAccess, user)
    dispatch(assignmentReasons(hasAccess ? 'TEAM' : user.roles.includes('TEAM_LEAD') ? 'User' : '')).then((res) => {
      setReasonList(res.payload.list)
    })
  }

  const submit = () => {
    setIsLoading(true);
    const saveObj = {
      id: data?.workItemId,
      obj: {
        ...setDataObject(getValues()),
        expectedVersion: data?.workItemVersionNo,
      },
    };
    dispatch(ticketAssignment(saveObj)).then((res) => {
      console.log(res);
      if (res.payload.status == "200") {
        setOpen(false);
        fetchList({});
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      {isTeamLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <form style={{ padding: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SelectFields
                fieldName="teamId"
                label="Team"
                control={control}
                options={teamList?.map(({ id, name }) => {
                  return { label: name, value: id };
                })}
                rules={{
                  required: "Team is required",
                }}
                error={errors?.teamId}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectFields
                fieldName="assignmentReasonCode"
                label="Reason"
                control={control}
                options={reasonList?.map(({ reasonCode, reasonName }) => {
                  return { label: reasonName, value: reasonCode };
                })}
                rules={{
                  required: "Reason is required",
                }}
                error={errors?.assignmentReasonCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFields
                fieldName="assignmentComment"
                type="text"
                label="Comment"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonContainer >
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
                  {isLoading && (
                    <CircularProgress
                      size={20}
                      sx={{ marginRight: 1, color: "#fff" }}
                    />
                  )}
                  Assign Team
                </Button>
              </ButtonContainer>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default TicketAssignForm;
