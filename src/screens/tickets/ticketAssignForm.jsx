import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import ButtonContainer from "../../components/buttonContainer";
import SelectFields from "../../components/SelectFields";
import { useDispatch, useSelector } from "react-redux";
import {
  assignmentReasons,
  ticketAssignee,
  ticketAssignment,
} from "../../store/actions/tickets";
import TextAreaFields from "../../components/textAreaFields";
import { setDataObject } from "../../utils/Utils";
import { teams, teamsMember } from "../../store/actions/teams";
import {UserRoundArrowLeft } from "lucide-react";

const TicketAssignForm = (props) => {
  const { data, setOpen, fetchList } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isTeamLoading, setIsTeamLoading] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [reasonList, setReasonList] = useState([]);
  const [dataList, setDataList] = useState([]);

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
    watch,
    getValues,
    formState: { errors },
  } = defaultValues;

  const allowedRoles = ['SYSTEM_ADMIN', 'SUPPORT_L1', 'SUPPORT_L2', 'SUPPORT_L3'];

  useEffect(() => {
    const hasAccess = allowedRoles.some(role => user.roles.includes(role));
    if (hasAccess) {
      setIsTeamLoading(true);
      const obj = {
        pageSize: 1000,
        pageNo: 1,
      };
      dispatch(teams(obj)).then((res) => {
        setTeamList(res.payload.list);
        setIsTeamLoading(false);
      });
    }

    const allowedReasonRoles = ['SYSTEM_ADMIN', 'SUPPORT_L1', 'SUPPORT_L2', 'SUPPORT_L3', 'TEAM_LEAD'];
    if (allowedReasonRoles.some(role => user.roles.includes(role))) {
      getAssignReasons();
    }

    if (user.roles.includes('TEAM_LEAD')) {
      getTeamMember()
    }
  }, []);

  const getAssignReasons = () => {
    const hasAccess = allowedRoles.some(role => user.roles.includes(role));
    dispatch(assignmentReasons(hasAccess ? 'TEAM' : user.roles.includes('TEAM_LEAD') ? 'User' : '')).then((res) => {
      setReasonList(res.payload.list)
    })
  }

  const getTeamMember = () => {
    setIsTeamLoading(true);
    dispatch(teamsMember(user.teamId)).then((res) => {
      console.log(res.payload.data.items)
      if (res.payload.status == 200) {
        setDataList(res.payload.data.items);
      }
      setIsTeamLoading(false);
    })
  }

  const submit = () => {
    setIsLoading(true);
    if (allowedRoles.some(role => user.roles.includes(role))) {
      teamAssignee()
    }

    if (user.roles.includes('TEAM_LEAD')) {
      userAssignee()
    }

  };

  const teamAssignee = () => {
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
  }

  const userAssignee = () => {
    const saveObj = {
      id: data?.workItemId,
      obj: {
        userId: watch('teamId'),
        assignmentComment: watch('assignmentComment'),
        assignmentReasonCode: watch('assignmentReasonCode'),
        expectedVersion: data?.versionNo,
      },
    };
    dispatch(ticketAssignee(saveObj)).then((res) => {
      console.log(res);
      if (res.payload.status == "200") {
        setOpen(false);
        fetchList({});
      }
      setIsLoading(false);
    });
  }
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
            {allowedRoles.some(role => user.roles.includes(role)) && <Grid item xs={12}>
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
            </Grid>}
            {user.roles.includes('TEAM_LEAD') && <Grid item xs={12}>
              <SelectFields
                fieldName="teamId"
                label="Member"
                control={control}
                options={dataList?.map(({ userId, displayName }) => {
                  return { label: displayName, value: userId };
                })}
                rules={{
                  required: "Team is required",
                }}
                error={errors?.teamId}
              />
            </Grid>}
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
                  <UserRoundArrowLeft size={16} style={{ marginRight: 8 }} />
                  {allowedRoles.some((role) => user.roles.includes(role))
                    ? "Assign team"
                    : "Assign user"}
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
