import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ArrowLeft,
  Check,
  FilePlus2,
  MailCheck,
  MoreHorizontal,
  Pencil,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ticketById } from "../../store/actions/tickets";
import ModalButton from "../../components/modalButton/modalButton";
import TicketClassifyForm from "./ticketClassifyForm";
import TicketAssignForm from "./ticketAssignForm";
import TicketAckApprove from "./ticketAckApprove";
import Status from "../../components/status/status";
import WorkTypeCode from "../../components/workTypeCode/workTypeCode";
import AcknowledgeStatus from "../../components/acknowledgeStatus/acknowledgeStatus";
import "./ticketDetail.scss";

const TicketDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const initialTicket = location.state || null;
  const [ticket, setTicket] = useState(initialTicket);
  const [isLoading, setIsLoading] = useState(Boolean(initialTicket?.workItemId));
  const [openClassify, setOpenClassify] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openApproval, setOpenApproval] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);

  useEffect(() => {
    if (!initialTicket?.workItemId) return;
    dispatch(ticketById(initialTicket.workItemId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") setTicket(result.payload);
      setIsLoading(false);
    });
  }, [dispatch, initialTicket?.workItemId]);

  if (!initialTicket?.workItemId) {
    return (
      <Box className="screenPage ticketDetailPage">
        <Button
          startIcon={<ArrowLeft size={16} />}
          onClick={() => navigate("/tickets")}
          className="ticketBackButton"
        >
          Back to tickets
        </Button>
        <Typography>Choose a ticket from the list to view its details.</Typography>
      </Box>
    );
  }

  const refreshTicket = () => {
    dispatch(ticketById(initialTicket.workItemId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") setTicket(result.payload);
    });
  };

  const isUnclassified = ticket?.workTypeCode === "UNCLASSIFIED";
  const canReview = ticket?.acknowledgementStatus === "AWAITING_APPROVAL";
  const createdAt = ticket?.createdAt
    ? moment(ticket.createdAt).fromNow()
    : "";
  const source = String(ticket?.sourceChannel || "Client request");
  const assignedTeam =
    ticket?.teamName || ticket?.team?.name || ticket?.assignedTeamName;
  const firstDate = (...values) => values.find(Boolean);
  const actorName = (value) =>
    typeof value === "string"
      ? value
      : value?.displayName || value?.name || value?.username;
  const generatedAt = firstDate(
    ticket?.generatedAt,
    ticket?.acknowledgementCreatedAt,
    ticket?.acknowledgementGeneratedAt,
    ticket?.acknowledgement?.generatedAt,
  );
  const approvedAt = firstDate(
    ticket?.approvedAt,
    ticket?.acknowledgementApprovedAt,
    ticket?.acknowledgement?.approvedAt,
  );
  const queuedAt = firstDate(
    ticket?.queuedAt,
    ticket?.acknowledgementQueuedAt,
    ticket?.acknowledgement?.queuedAt,
  );
  const approvedBy = actorName(
    ticket?.approvedByName ||
      ticket?.approvedByUserName ||
      ticket?.acknowledgementApprovedByName ||
      ticket?.approvedBy ||
      ticket?.acknowledgement?.approvedBy,
  );
  const updatedBy = actorName(ticket?.updatedByName || ticket?.updatedBy);
  const activityEvents = [
    {
      key: "created",
      title: "Ticket created from " + source.toLowerCase(),
      detail: "Initial request received",
      timestamp: ticket?.createdAt,
      icon: <FilePlus2 size={15} />,
    },
    {
      key: "ack-generated",
      title: "Acknowledgement generated",
      detail: "Email acknowledgement prepared",
      timestamp: generatedAt,
      icon: <MailCheck size={15} />,
    },
    {
      key: "ack-approved",
      title: "Acknowledgement approved",
      detail: "Approved by " + (approvedBy || "user"),
      timestamp: approvedAt,
      icon: <ShieldCheck size={15} />,
    },
    {
      key: "ack-queued",
      title: "Acknowledgement queued for delivery",
      detail: "Email added to delivery queue",
      timestamp: queuedAt,
      icon: <Send size={15} />,
    },
    {
      key: "updated",
      title: "Ticket details updated",
      detail: updatedBy ? "Updated by " + updatedBy : "Latest ticket information saved",
      timestamp: ticket?.updatedAt,
      icon: <Pencil size={15} />,
    },
  ]
    .filter(
      (event) =>
        event.timestamp &&
        moment(event.timestamp).isValid() &&
        !(event.key === "updated" &&
          [ticket?.createdAt, generatedAt, approvedAt, queuedAt].some(
            (date) =>
              date &&
              moment(date).isValid() &&
              moment(date).valueOf() === moment(event.timestamp).valueOf(),
          )),
    )
    .sort(
      (first, second) =>
        moment(first.timestamp).valueOf() -
        moment(second.timestamp).valueOf(),
    );

  return (
    <Box className="screenPage ticketDetailPage">
      <Box className="ticketDetailTopbar">
        <Box>
          <Button
            startIcon={<ArrowLeft size={15} />}
            onClick={() => navigate("/tickets")}
            className="ticketBackButton"
          >
            Back to tickets
          </Button>
          <Box className="ticketDetailIdentity">
            <Typography className="ticketDetailNumber">
              {ticket?.ticketNo}
            </Typography>
            {ticket?.stateCode && <Status value={ticket.stateCode} />}
          </Box>
          <Typography component="h1" className="ticketDetailTitle">
            {ticket?.title || ticket?.subject || "Ticket details"}
          </Typography>
          <Typography className="ticketDetailSubtitle">
            {[ticket?.clientName, source, createdAt && `received ${createdAt}`]
              .filter(Boolean)
              .join(" . ")}
          </Typography>
        </Box>
        <Box className="ticketDetailActions">

          {isUnclassified && (
            <Button
              variant="contained"
              onClick={() => setOpenClassify(true)}
              className="ticketPrimaryAction"
            >
              Classify ticket
            </Button>
          )}
          {canReview && (
            <Button
              variant="contained"
              onClick={() => setOpenApproval(true)}
              className="ticketPrimaryAction"
              startIcon={<Check size={15} />}
            >
              Review acknowledgement
            </Button>
          )}
        </Box>
      </Box>

      {isLoading ? (
        <Box className="ticketDetailLoading">
          <CircularProgress size={32} />
        </Box>
      ) : (
        <Box className="ticketDetailContent">
          <Box className="ticketDetailMainColumn">
            <Box className="ticketRequestCard">
              <Typography className="ticketCardEyebrow">CLIENT REQUEST</Typography>
              <Typography className="ticketRequestText">
                {ticket?.description || "No description was provided."}
              </Typography>
            </Box>

            <Box className="ticketActivityCard">
              <Typography className="ticketActivityTitle">Activity</Typography>
              <Typography className="ticketActivityDescription">
                Ticket Activity Timeline.
              </Typography>
              {activityEvents.length ? (
                activityEvents.map((event) => (
                  <Box className="ticketActivityItem" key={event.key}>
                    <Box className="ticketActivityAvatar">{event.icon}</Box>
                    <Box className="ticketActivityCopy">
                      <Typography className="ticketActivityEvent">
                        {event.title}
                      </Typography>
                      <Typography className="ticketActivityMeta">
                        {event.detail} | {moment(event.timestamp).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography className="ticketActivityEmpty">
                  No activity events are available for this ticket yet.
                </Typography>
              )}
            </Box>
          </Box>

          <Box className="ticketOverviewCard">
            <Typography className="ticketOverviewTitle">Ticket overview</Typography>
            <Box className="ticketOverviewRows">
              <Box className="ticketOverviewRow">
                <span>Classification</span>
                <WorkTypeCode value={ticket?.workTypeCode || "UNCLASSIFIED"} />
              </Box>
              <Box className="ticketOverviewRow">
                <span>Assigned team</span>
                <strong>{assignedTeam || ticket?.teamCode || "UNASSIGNED"}</strong>
              </Box>
              <Box className="ticketOverviewRow">
                <span>Queue</span>
                <strong>{ticket?.queueName || ticket?.queueCode || "-"}</strong>
              </Box>
              <Box className="ticketOverviewRow">
                <span>Acknowledgement</span>
                {ticket?.acknowledgementStatus ? (
                  <AcknowledgeStatus value={ticket.acknowledgementStatus} />
                ) : (
                  <span className="ticketOverviewFallback">NOT STARTED</span>
                )}
              </Box>
              <Box className="ticketOverviewRow">
                <span>Workflow</span>
                <strong>{ticket?.workflowCode || "-"}</strong>
              </Box>
              <Box className="ticketOverviewRow">
                <span>Version</span>
                <strong>{ticket?.workItemVersionNo ?? ticket?.versionNo ?? "-"}</strong>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Users size={15} />}
              onClick={() => setOpenAssign(true)}
              className="ticketReassignButton"
            >
              Reassign team
            </Button>
          </Box>
        </Box>
      )}

      <ModalButton
        open={openClassify}
        setOpen={setOpenClassify}
        heading="Classify ticket"
      >
        <TicketClassifyForm
          data={ticket}
          setOpen={setOpenClassify}
          fetchList={refreshTicket}
        />
      </ModalButton>
      <ModalButton
        open={openAssign}
        setOpen={setOpenAssign}
        heading="Reassign team"
      >
        <TicketAssignForm
          data={ticket}
          setOpen={setOpenAssign}
          fetchList={refreshTicket}
        />
      </ModalButton>
      <ModalButton
        open={openApproval}
        setOpen={setOpenApproval}
        heading="Review acknowledgement"
      >
        <TicketAckApprove
          data={ticket}
          setOpen={setOpenApproval}
          onApproved={refreshTicket}
        />
      </ModalButton>
    </Box>
  );
};

export default TicketDetail;
