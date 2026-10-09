import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Check, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { acknowledgementApprove } from "../../store/actions/tickets";
import ButtonContainer from "../../components/buttonContainer";

const TicketAckApprove = ({ setOpen, data, onApproved }) => {
  const dispatch = useDispatch();
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
        sx={{ mb: 0.5, color: "#64748b", fontSize: 11, fontWeight: 700 }}
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
          border: "1px solid #dbe3ed",
          borderRadius: 1.5,
          bgcolor: "#fff",
          color: "#334155",
          fontSize: 11,
          fontWeight: 600,
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
          border: "1px solid #e5eaf1",
          borderRadius: 1.5,
          bgcolor: "#f8fafc",
        }}
      >
        <Typography sx={{ color: "#26354b", fontSize: 11, fontWeight: 700 }}>
          {data?.ticketNo}
        </Typography>
        <Typography sx={{ color: "#718096", fontSize: 10 }}>
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
          bgcolor: "#f1f0ff",
          color: "#635bdb",
        }}
      >
        <Send size={16} />
        <Typography sx={{ fontSize: 10 }}>
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
