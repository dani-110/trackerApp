import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";
import { ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PageHeader from "../../components/pageHeader/pageHeader";
import ModalButton from "../../components/modalButton/modalButton";
import { ticketById, tickets } from "../../store/actions/tickets";
import TicketAckApprove from "./ticketAckApprove";

const ApprovalQueue = () => {
  const dispatch = useDispatch();
  const { tickets: ticketList = [], totalcount = 0 } = useSelector(
    (state) => state.tickets,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState(null);
  const [openReview, setOpenReview] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchApprovals = useCallback(
    (nextPage = page, nextRowsPerPage = rowsPerPage) => {
      setIsLoading(true);
      dispatch(
        tickets({
          pageNo: nextPage + 1,
          pageSize: nextRowsPerPage,
          filters: { emailStatus: "AWAITING_APPROVAL" },
        }),
      ).finally(() => setIsLoading(false));
    },
    [dispatch, page, rowsPerPage],
  );

  useEffect(() => {
    fetchApprovals(0, rowsPerPage);
  }, []);

  const openApproval = async (ticket) => {
    setReviewingId(ticket.workItemId);
    const result = await dispatch(ticketById(ticket.workItemId));
    setReviewingId(null);
    if (result.meta.requestStatus === "fulfilled") {
      setSelectedTicket(result.payload);
      setOpenReview(true);
    }
  };

  const handleApproved = () => {
    const nextPage =
      page > 0 && totalcount - 1 <= page * rowsPerPage ? page - 1 : page;
    setPage(nextPage);
    fetchApprovals(nextPage, rowsPerPage);
  };

  return (
    <Box className="screenPage approvalsPage">
      <Box sx={{ width: "100%", mx: "auto" }}>
        <PageHeader
          eyebrow="MY WORK"
          title="Approvals"
          description="Only the items waiting for your decision."
        />
        <Box sx={{ mt: 2.5 }}>
          {isLoading && ticketList.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
              <CircularProgress size={34} />
            </Box>
          ) : ticketList.length === 0 ? (
            <Box
              sx={{
                p: 3,
                border: "1px solid #dce4ef",
                borderRadius: 3,
                bgcolor: "#f8fafc",
              }}
            >
              <Typography sx={{ color: "#405574", fontWeight: 600 }}>
                No acknowledgements are waiting for approval.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                overflow: "hidden",
                border: "1px solid #dce4ef",
                borderRadius: 3,
                bgcolor: "#f8fafc",
                boxShadow: "0 10px 26px rgba(27, 47, 75, .05)",
              }}
            >
              {ticketList.map((ticket) => (
                <Box
                  key={ticket.workItemId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.25,
                    py: 1.75,
                    borderBottom: "1px solid #e5eaf1",
                    "&:last-of-type": { borderBottom: 0 },
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      flex: "0 0 36px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 1.5,
                      bgcolor: "#e4e8ff",
                      color: "#5c56e8",
                    }}
                  >
                    <ShieldCheck size={19} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{ color: "#203047", fontSize: "16px", fontWeight: 600 }}
                    >
                      Acknowledgement ready for review
                    </Typography>
                    <Typography sx={{ color: "#596c88", fontSize: 12 }} noWrap>
                      {ticket.ticketNo} · {ticket.title || ticket.subject || ""}
                    </Typography>
                    <Typography sx={{ color: "#8795a9", fontSize: 11 }} noWrap>
                      To: {ticket.reporterContactEmail || "—"}
                      {ticket.createdAt
                        ? ` · Created ${moment(ticket.createdAt).fromNow()}`
                        : ""}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={reviewingId === ticket.workItemId}
                    onClick={() => openApproval(ticket)}
                    sx={{
                      minWidth: 68,
                      borderColor: "#dbe3ed",
                      color: "#243247",
                      textTransform: "none",
                      borderRadius: 1.5,
                      fontWeight: 600,
                      "&:hover": { borderColor: "#c6cefa" },
                    }}
                  >
                    {reviewingId === ticket.workItemId ? (
                      <CircularProgress size={17} />
                    ) : (
                      "Review"
                    )}
                  </Button>
                </Box>
              ))}
              <TablePagination
                component="div"
                count={totalcount}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, nextPage) => {
                  setPage(nextPage);
                  fetchApprovals(nextPage, rowsPerPage);
                }}
                onRowsPerPageChange={(event) => {
                  const nextRowsPerPage = parseInt(event.target.value, 10);
                  setRowsPerPage(nextRowsPerPage);
                  setPage(0);
                  fetchApprovals(0, nextRowsPerPage);
                }}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{ borderTop: "1px solid #e5eaf1", color: "#64758b" }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <ModalButton
        open={openReview}
        setOpen={setOpenReview}
        heading="Review acknowledgement"
        width="30%"
      >
        <TicketAckApprove
          data={selectedTicket}
          setOpen={setOpenReview}
          onApproved={handleApproved}
        />
      </ModalButton>
    </Box>
  );
};

export default ApprovalQueue;
