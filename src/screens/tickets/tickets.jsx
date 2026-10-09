import {
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import { tickets } from "../../store/actions/tickets";
import { getdashboarddata } from "../../store/actions/auth";
import TicketCreateForm from "./ticketCreateForm";
import { Search } from "lucide-react";
import PageHeader from "../../components/pageHeader/pageHeader";

const Tickets = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    fetchList({});
    dispatch(getdashboarddata({ silent: true }))
      .unwrap()
      .then((data) => {
        setTeamId(
          data?.summary?.teamId ??
            data?.teamId ??
            data?.summary?.team?.id ??
            "",
        );
      })
      .catch(() => setTeamId(""));
  }, []);

  const fetchList = (data = {}, rowsPerPage, page) => {
    const nextFilters = Object.keys(data).length ? data : filters;
    if (Object.keys(data).length) setFilters(data);
    const request = { ...nextFilters };
    setIsLoading(true);
    if (rowsPerPage) {
      request.pageSize = rowsPerPage;
      request.pageNo = page + 1;
    } else {
      request.pageSize = request.pageSize || 10;
      request.pageNo = request.pageNo || 1;
    }
    const { pageNo, pageSize, ...queryFilters } = request;
    dispatch(tickets({ pageNo, pageSize, filters: queryFilters })).then(() => {
      setIsLoading(false);
    });
  };

  const selectFilter = (key, value) => {
    const next = search.trim() ? { search: search.trim() } : {};

    if (key !== "all" && value !== undefined) {
      next[key] = value;
    }

    setActiveFilter(value ?? "all");
    next.pageNo = 1;
    fetchList(next);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = { ...filters };
      if (search.trim()) next.search = search.trim();
      else delete next.search;
      next.pageNo = 1;
      fetchList(next);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const filterChip = (label, key, value, disabled = false) => (
    <Chip
      key={label}
      label={label}
      size="small"
      disabled={disabled}
      onClick={() => selectFilter(key, value)}
      variant={activeFilter === (value || key) ? "filled" : "outlined"}
      sx={{
        borderRadius: "18px",
        height: 28,
        px: 0.25,
        fontSize: 12,
        color: activeFilter === (value || key)
          ? theme.palette.ticketFilterChipActiveText
          : theme.palette.ticketFilterChipText,
        borderColor: activeFilter === (value || key)
          ? theme.palette.ticketFilterChipActiveBorder
          : theme.palette.ticketFilterChipBorder,
        bgcolor: activeFilter === (value || key)
          ? theme.palette.ticketFilterChipActiveBackground
          : theme.palette.ticketFilterChipBackground,
        "&:hover": {
          bgcolor: activeFilter === (value || key)
            ? theme.palette.ticketFilterChipActiveBackground
            : theme.palette.action.hover,
        },
        "&.Mui-disabled": { opacity: 0.45 },
      }}
    />
  );

  return (
    <Box className="screenPage ticketListPage">
      <PageHeader
        eyebrow="WORK MANAGEMENT"
        title="Tickets"
        description="One place to triage, classify and move client work forward."
        action={
          <ModalButton
            open={openCreate}
            setOpen={setOpenCreate}
            label="New Ticket"
            heading="Create New Ticket"
            type="button"
            startIcon={<IoMdAdd />}
            width="40%"
          >
            <TicketCreateForm setOpen={setOpenCreate} fetchList={fetchList} />
          </ModalButton>
        }
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
        {filterChip("All", "all")}
        {filterChip(
          "My team",
          "teamId",
          teamId || undefined,
          !teamId,
        )}
        {filterChip("Unclassified", "workTypeCode", "UNCLASSIFIED")}
        {filterChip("Awaiting approval", "emailStatus", "AWAITING_APPROVAL")}
        {filterChip("Bugs", "workTypeCode", "BUG")}
        {filterChip("Change requests", "workTypeCode", "CHANGE_REQUEST")}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          bgcolor: "background.paper",
          border: "1px solid var(--mui-palette-divider)",
          borderBottom: 0,
          borderRadius: "14px 14px 0 0",
          marginBottom: "-18px",
        }}
      >
        <TextField
          size="small"
          placeholder="Search ticket, client or subject"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            width: { xs: "100%", sm: 310 },
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.paper",
              borderRadius: 2,
              fontSize: 13,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="#91a0b5" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <DataGrid fetchList={fetchList} isLoading={isLoading} search={search} />
    </Box>
  );
};
export default Tickets;
