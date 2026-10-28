import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tabs,
  Tab,
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
  MessageSquare,
  GitBranch,
  History,
  ChevronDown,
  ChevronUp,
  Clipboard,
} from "lucide-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ticketById } from "../../store/actions/tickets";
import ModalButton from "../../components/modalButton/modalButton";
import TicketClassifyForm from "./ticketClassifyForm";
import TicketAssignForm from "./ticketAssignForm";
import TicketAckApprove from "./ticketAckApprove";
import Status from "../../components/status/status";
import WorkTypeCode from "../../components/workTypeCode/workTypeCode";
import AcknowledgeStatus from "../../components/acknowledgeStatus/acknowledgeStatus";
import PageHeader from "../../components/pageHeader/pageHeader";
import Communication from "./communication";
import AssignmentHistory from "./assignmentHistory";
import OutboxEvent from "./outboxEvent";
import "./ticketDetail.scss";
import PermissionComp from "../../components/permissionComp/permissionComp";

const historyDate = (value) =>
  value ? moment(value).format("DD MMM YYYY · hh:mm A") : "—";

const renderHistoryRecords = (
  kind,
  state,
  setReloadKey,
  expanded,
  setExpanded,
) => {
  if (state.loading)
    return (
      <Box className="referenceLoading">
        <CircularProgress size={24} />
      </Box>
    );
  if (state.error)
    return (
      <Box className="referenceEmpty">
        <Typography>Unable to load records.</Typography>
        <Button onClick={() => setReloadKey((key) => key + 1)}>Retry</Button>
      </Box>
    );
  if (!state.items.length)
    return (
      <Box className="referenceEmpty">
        No{" "}
        {kind === "communication"
          ? "communication records"
          : kind === "outbox"
            ? "outbox events"
            : "assignment history"}{" "}
        for this ticket.
      </Box>
    );

  return (
    <Box className="referenceList">
      {state.items.map((record, index) => {
        const item = record;
        const key = item.id || `${kind}-${index}`;
        const isOpen = expanded[key] ?? index === 0;
        const Icon =
          kind === "communication"
            ? MessageSquare
            : kind === "outbox"
              ? GitBranch
              : History;
        const fields = item.fields.filter(
          ([, value]) => value !== undefined && value !== null && value !== "",
        );
        return (
          <Box className="referenceRecord" key={key}>
            <Box
              className="referenceRecordHeader"
              onClick={() =>
                setExpanded((current) => ({ ...current, [key]: !isOpen }))
              }
            >
              <Box className="referenceRecordIcon">
                <Icon size={15} />
              </Box>
              <Box className="referenceRecordSummary">
                <Typography className="referenceRecordTitle">
                  {item.title}
                </Typography>
                <Typography className="referenceRecordMeta">
                  {item.id || "—"} · {historyDate(item.time)}
                  {item.actor ? ` · ${item.actor}` : ""}
                </Typography>
                {item.summary && (
                  <Typography className="referenceRecordDescription">
                    {item.summary}
                  </Typography>
                )}
              </Box>
                <Status value={item.statusLabel || item.status || "UNKNOWN"} />
              <IconButton
                size="small"
                aria-label={isOpen ? "Collapse record" : "Expand record"}
              >
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </IconButton>
            </Box>
            {isOpen && (
              <Box className="referenceRecordDetails">
                <Box className="referenceFields">
                  {fields.map(([name, value]) => (
                    <Box className="referenceField" key={name}>
                      <span>{name}</span>
                      <strong>
                        {value instanceof Date ||
                        (typeof value === "string" &&
                          /at$/i.test(name) &&
                          moment(value).isValid())
                          ? historyDate(value)
                          : Array.isArray(value)
                            ? value.join(", ") || "—"
                            : String(value)}
                      </strong>
                    </Box>
                  ))}
                </Box>
                <Box className="referenceCopyRow">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Clipboard size={14} />}
                    disabled={!item.id}
                    onClick={() => navigator.clipboard?.writeText(item.id)}
                  >
                    Copy reference
                  </Button>
                  <Typography>Reference details are read only.</Typography>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

const TicketDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const knownUsers = useSelector((state) => state.users.users);
  const initialTicket = location.state || null;
  const [ticket, setTicket] = useState(initialTicket);
  const [isLoading, setIsLoading] = useState(
    Boolean(initialTicket?.workItemId),
  );
  const [openClassify, setOpenClassify] = useState(false);
  const [openAssignTicket, setOpenAssignTicket] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openReAssign, setOpenReAssign] = useState(false);
  const [openApproval, setOpenApproval] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [historyTab, setHistoryTab] = useState("communication");
  const [communicationState, setCommunicationState] = useState({
    items: [],
    loading: true,
    error: false,
  });
  const [outboxState, setOutboxState] = useState({
    items: [],
    loading: true,
    error: false,
  });
  const [assignmentState, setAssignmentState] = useState({
    items: [],
    loading: true,
    error: false,
  });
  const [historyReloadKey, setHistoryReloadKey] = useState(0);
  const [expandedHistory, setExpandedHistory] = useState({});
  const { user } = useSelector((state) => state.auth);

  const allowedRoles = [
    "SYSTEM_ADMIN",
    "SUPPORT_L1",
    "SUPPORT_L2",
    "SUPPORT_L3",
  ];
  const hasAccess = allowedRoles.some((role) => user.roles.includes(role))
    ? "Assign Team"
    : user.roles.includes("TEAM_LEAD")
      ? "Assign User"
      : "";
  const reassignButton = allowedRoles.some((role) => user.roles.includes(role))
    ? "Reassign Team"
    : user.roles.includes("TEAM_LEAD")
      ? "Reassign User"
      : "";

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
        <Typography>
          Choose a ticket from the list to view its details.
        </Typography>
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
  const createdAt = ticket?.createdAt ? moment(ticket.createdAt).fromNow() : "";
  const source = String(ticket?.sourceChannel || "Client request");
  const assignedTeam =
    ticket?.teamName || ticket?.team?.name || ticket?.assignedTeamName;
  const firstDate = (...values) => values.find(Boolean);
  const actorName = (value) => {
    if (value && typeof value === "object") {
      return (
        value.displayName || value.fullName || value.name || value.username
      );
    }
    if (typeof value !== "string") return "";

    const matchingUser = [currentUser, ...(knownUsers || [])].find((person) =>
      [person?.id, person?.userId, person?.userID]
        .filter((id) => id !== undefined && id !== null)
        .some((id) => String(id).toLowerCase() === value.toLowerCase()),
    );
    const resolvedName =
      matchingUser?.displayName ||
      matchingUser?.fullName ||
      matchingUser?.name ||
      matchingUser?.username;

    if (resolvedName) return resolvedName;

    // Avoid exposing an unresolved GUID or numeric database ID in the activity feed.
    const looksLikeId =
      /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(value) || /^\d+$/.test(value);
    return looksLikeId ? "a team member" : value;
  };
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
      ticket?.approvedByDisplayName ||
      ticket?.approvedByUserName ||
      ticket?.approvedByUsername ||
      ticket?.acknowledgementApprovedByName ||
      ticket?.approvedBy ||
      ticket?.acknowledgement?.approvedBy,
  );
  const updatedBy = actorName(
    ticket?.updatedByName ||
      ticket?.updatedByDisplayName ||
      ticket?.updatedByUsername ||
      ticket?.updatedBy ||
      ticket?.updatedByUserId,
  );
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
      detail: updatedBy
        ? "Updated by " + updatedBy
        : "Latest ticket information saved",
      timestamp: ticket?.updatedAt,
      icon: <Pencil size={15} />,
    },
  ]
    .filter(
      (event) =>
        event.timestamp &&
        moment(event.timestamp).isValid() &&
        !(
          event.key === "updated" &&
          [ticket?.createdAt, generatedAt, approvedAt, queuedAt].some(
            (date) =>
              date &&
              moment(date).isValid() &&
              moment(date).valueOf() === moment(event.timestamp).valueOf(),
          )
        ),
    )
    .sort(
      (first, second) =>
        moment(first.timestamp).valueOf() - moment(second.timestamp).valueOf(),
    );

  return (
    <Box className="screenPage ticketDetailPage">
      <Box className="ticketBackRow">
        <Button
          startIcon={<ArrowLeft size={15} />}
          onClick={() => navigate("/tickets")}
          className="ticketBackButton"
        >
          Back to tickets
        </Button>
      </Box>
      <PageHeader
        eyebrow={
          <span className="ticketDetailHeaderEyebrow">
            {ticket?.ticketNo}
            {ticket?.stateCode && <Status value={ticket.stateCode} />}
          </span>
        }
        title={ticket?.title || ticket?.subject || "Ticket details"}
        description={[
          ticket?.clientName,
          source,
          createdAt && `received ${createdAt}`,
        ]
          .filter(Boolean)
          .join(" . ")}
        action={
          <Box className="ticketDetailActions">
            {hasAccess && (
              <PermissionComp name="TICKET_ASSIGN">
                <ModalButton
                  type="button"
                  label={hasAccess}
                  heading={hasAccess}
                  variant="outlined"
                  startIcon={<Users size={15} />}
                  open={openAssign}
                  setOpen={setOpenAssign}
                >
                  <TicketAssignForm
                    data={ticket}
                    setOpen={setOpenAssign}
                    fetchList={refreshTicket}
                  />
                </ModalButton>
              </PermissionComp>
            )}

            {isUnclassified && (
              <PermissionComp name="TICKET_CLASSIFY">
                <ModalButton
                  type="button"
                  label="Classify ticket"
                  heading="Classify ticket"
                  variant="contained"
                  open={openClassify}
                  setOpen={setOpenClassify}
                >
                  <TicketClassifyForm
                    data={ticket}
                    setOpen={setOpenClassify}
                    fetchList={refreshTicket}
                  />
                </ModalButton>
              </PermissionComp>
            )}
            {canReview && (
              <PermissionComp name="TICKET_ACK_APPROVE">
                <ModalButton
                  type="button"
                  label="Review acknowledgement"
                  heading="Review acknowledgement"
                  variant="contained"
                  startIcon={<Check size={15} />}
                  open={openApproval}
                  setOpen={setOpenApproval}
                >
                  <TicketAckApprove
                    data={ticket}
                    setOpen={setOpenApproval}
                    onApproved={refreshTicket}
                  />
                </ModalButton>
              </PermissionComp>
            )}
          </Box>
        }
      />

      {isLoading ? (
        <Box className="ticketDetailLoading">
          <CircularProgress size={32} />
        </Box>
      ) : (
        <Box className="ticketDetailContent">
          <Box className="ticketDetailMainColumn">
            <Box className="ticketRequestCard">
              <Typography className="ticketCardEyebrow">
                CLIENT REQUEST
              </Typography>
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
            <Typography className="ticketOverviewTitle">
              Ticket overview
            </Typography>
            <Box className="ticketOverviewRows">
              <Box className="ticketOverviewRow">
                <span>Classification</span>
                <WorkTypeCode value={ticket?.workTypeCode || "UNCLASSIFIED"} />
              </Box>
              <Box className="ticketOverviewRow">
                <span>Assigned team</span>
                <strong>
                  {assignedTeam || ticket?.teamCode || "UNASSIGNED"}
                </strong>
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
                <strong>
                  {ticket?.workItemVersionNo ?? ticket?.versionNo ?? "-"}
                </strong>
              </Box>
            </Box>
            {hasAccess && (
              <PermissionComp name="TICKET_ASSIGN">
                <ModalButton
                  type="button"
                  label={reassignButton}
                  heading={hasAccess}
                  variant="outlined"
                  startIcon={<Users size={15} />}
                  open={openReAssign}
                  setOpen={setOpenReAssign}
                  className="ticketReassignButton"
                >
                  <TicketAssignForm
                    data={ticket}
                    setOpen={setOpenReAssign}
                    fetchList={refreshTicket}
                  />
                </ModalButton>
              </PermissionComp>
            )}
          </Box>
        </Box>
      )}
      {!isLoading && ticket && (
        <Box className="ticketLinkedRecords">
          <Box className="ticketLinkedRecordsHeader">
            <Box>
              <Typography className="ticketCardEyebrow">
                LINKED RECORDS
              </Typography>
              <Typography className="ticketActivityTitle">
                Ticket reference center
              </Typography>
              <Typography className="ticketActivityDescription">
                Trace communications, integration events and assignment changes
                for {ticket.ticketNo}.
              </Typography>
            </Box>
          </Box>
          <Tabs
            value={historyTab}
            onChange={(_, value) => setHistoryTab(value)}
            className="ticketLinkedTabs"
          >
            <Tab
              value="communication"
              label={
                <span className="ticketHistoryTabLabel">
                  <MessageSquare size={14} />
                  Communication
                  <span className="ticketHistoryCount">
                    {communicationState.items.length}
                  </span>
                </span>
              }
            />
            <Tab
              value="outbox"
              label={
                <span className="ticketHistoryTabLabel">
                  <GitBranch size={14} />
                  Outbox Events
                  <span className="ticketHistoryCount">
                    {outboxState.items.length}
                  </span>
                </span>
              }
            />
            <Tab
              value="assignment"
              label={
                <span className="ticketHistoryTabLabel">
                  <History size={14} />
                  Assignment History
                  <span className="ticketHistoryCount">
                    {assignmentState.items.length}
                  </span>
                </span>
              }
            />
          </Tabs>
          <Box className="ticketLinkedTabPanel">
            {historyTab === "communication" &&
              renderHistoryRecords(
                "communication",
                communicationState,
                setHistoryReloadKey,
                expandedHistory,
                setExpandedHistory,
              )}
            {historyTab === "outbox" &&
              renderHistoryRecords(
                "outbox",
                outboxState,
                setHistoryReloadKey,
                expandedHistory,
                setExpandedHistory,
              )}
            {historyTab === "assignment" &&
              renderHistoryRecords(
                "assignment",
                assignmentState,
                setHistoryReloadKey,
                expandedHistory,
                setExpandedHistory,
              )}
          </Box>
          <Communication
            data={ticket}
            reloadKey={historyReloadKey}
            onData={setCommunicationState}
          />
          <OutboxEvent
            data={ticket}
            reloadKey={historyReloadKey}
            onData={setOutboxState}
          />
          <AssignmentHistory
            data={ticket}
            reloadKey={historyReloadKey}
            onData={setAssignmentState}
          />
        </Box>
      )}
    </Box>
  );
};

export default TicketDetail;
