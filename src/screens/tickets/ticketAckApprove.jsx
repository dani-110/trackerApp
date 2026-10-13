import { useState } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { Check, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { acknowledgementApprove } from "../../store/actions/tickets";
import ButtonContainer from "../../components/buttonContainer";

const TicketAckApprove = ({ setOpen, data, onApproved }) => {
  const dispatch = useDispatch();
  const theme=useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true);
    const saveObj = {
      id: data?.workItemId,
      obj: {
        acknowledgementId: data?.acknowledgementId,
        expectedVersion: data?.communicationVersionNo,
      },
    };
    dispatch(acknowledgementApprove(saveObj)).then((res) => {
      if (res.payload?.status == "200") {
        setOpen(false);
        onApproved?.();
      }
      setIsLoading(false);
    });
  };

  const field = (label, value) => (
    <Box sx={{ mb: 1.2 }}>
      <Typography
        sx={{ mb: 0.5, color: theme.palette.text.secondary, fontSize: 11, fontWeight: 500 }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          minHeight: 34,
          display: "flex",
          alignItems: "center",
          px: 1.25,
          py: 0.75,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1.5,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: 11,
          fontWeight: 500,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {value || "-"}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          mb: 1.5,
          p: 1.25,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1.5,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography sx={{ color: theme.palette.text.primary, fontSize: 11, fontWeight: 700 }}>
          {data?.ticketNo}
        </Typography>
        <Typography sx={{ color:theme.palette.text.secondary, fontSize: 10 }}>
          {data?.title}
        </Typography>
      </Box>
      {field("To", data?.reporterContactEmail)}
      {field("CC", data?.ccAddresses)}
      {field("Subject", `[${data?.ticketNo}] ${data?.title || ""}`)}
      {field("Message", data?.description)}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.2,
          mb: 1.5,
          borderRadius: 1.5,
          bgcolor: theme.palette.approvalQueueBackground,
          color: theme.palette.approvalQueueText,
        }}
      >
        <Send size={16} />
        <Typography sx={{ fontSize: 10, color:` ${theme.palette.approvalQueueText} !important`}}>
          Approval will queue the email for sending.
        </Typography>
      </Box>
      <ButtonContainer>
        <Button type="button" variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          size="medium"
          variant="contained"
          onClick={submit}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Check size={16} />
            )
          }
        >
          Approve &amp; queue
        </Button>
      </ButtonContainer>
    </Box>
  );
};

export default TicketAckApprove;
