import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdashboarddata } from "../../store/actions/auth";
import DashboardMetricCard from "../../components/dashboardMetricCard/dashboardMetricCard";
import PageHeader from "../../components/pageHeader/pageHeader";
import WorkTypeCode, {
  getWorkTypeCodeStyle,
} from "../../components/workTypeCode/workTypeCode";
import { IconButton } from "@mui/material";
import { ArrowRight, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./dashboard.scss";

const formatMinutes = (minutes = 0) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${String(mins).padStart(2, "0")}m`;
};

const formatTimesheetStatus = (status) => {
  const labels = {
    NOT_STARTED: "Not started",
    DRAFT: "Draft",
    PENDING: "In progress",
    COMMITTED: "Committed",
  };

  return labels[status] || status || "Not started";
};

const formatDeadline = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth);

  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await dispatch(getdashboarddata()).unwrap();

        setDashboard(response);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [dispatch]);

  const summary = dashboard?.summary ?? {};
  const displayName =
    user?.displayName || user?.name || user?.username || "there";
  const pageHeader = (
    <PageHeader
      eyebrow={
        summary.workDate
          ? new Date(`${summary.workDate}T00:00:00`)
              .toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
              })
              .toUpperCase()
          : "WORKSPACE"
      }
      title={`Good morning, ${displayName}`}
      description="Here's what needs your attention today."
    />
  );

  if (isLoading) {
    return (
      <Box className="screenPage dashboardPage">
        {pageHeader}
        <Box className="dashboardLoading">Loading dashboard...</Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="screenPage dashboardPage">
        {pageHeader}
        <Box className="dashboardError">{error}</Box>
      </Box>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { priorityWork = [], today = [] } = dashboard;

  return (
    <Box className="screenPage dashboardPage">
      {pageHeader}

      {/* Dashboard Metric Cards */}
      <Box className="dashboardMetricGrid">
        <DashboardMetricCard
          className="attentionCard"
          label="Needs attention"
          value={summary.needsAttentionCount ?? 0}
          description={`${summary.unclassifiedCount ?? 0} unclassified · ${
            summary.pendingApprovalCount ?? 0
          } approvals`}
        />

        <DashboardMetricCard
          className="teamQueueCard"
          label="My team queue"
          value={summary.teamQueueCount ?? 0}
          description={summary.teamName || "No team"}
        />

        <DashboardMetricCard
          className="timeCard"
          label="Time logged today"
          value={formatMinutes(summary.loggedMinutes)}
          description={`of ${formatMinutes(summary.expectedMinutes)} expected`}
        />

        <DashboardMetricCard
          className="timesheetCard"
          label="Timesheet"
          value={formatTimesheetStatus(summary.timesheetStatus)}
          description={`Due today at ${formatDeadline(
            summary.commitDeadlineLocal,
          )}`}
        />
      </Box>

      {/* Main Dashboard Content */}
      <Box className="dashboardMainGrid">
        {/* Priority Work */}
        <Box className="dashboardPanel">
          <Box className="dashboardPanelHeader"
          sx={{
            backgroundColor:theme.palette.PanelHeaderBackground
          }}>
            <Box>
              <Typography className="dashboardPanelTitle">
                Priority work
              </Typography>

              <Typography className="dashboardPanelDescription">
                Items that need a decision or action.
              </Typography>
            </Box>

            <button
              type="button"
              className="dashboardViewAll"
              onClick={() => navigate("/tickets")}
            >
              View all 
              <IconButton
                    size="small"
                  >
                    <ArrowRight size={17} />
                  </IconButton>

            </button>
          </Box>

          <Box className="priorityWorkList">
            {priorityWork.length > 0 ? (
              priorityWork.map((item) => (
                <Box className="priorityWorkRow" key={item.workItemId}>
                  <Box
                    className="priorityWorkIndicator"
                    sx={{
                      backgroundColor: getWorkTypeCodeStyle(item.workTypeCode).color,
                    }}
                  />

                  <Box className="priorityWorkContent">
                    <Typography className="priorityWorkTitle">
                      {item.title}
                    </Typography>

                    <Typography className="priorityWorkMeta">
                      {item.workItemNo}
                      {" · "}
                      {item.clientCode}
                      {" · "}
                      {item.teamName}
                    </Typography>
                  </Box>

                  <WorkTypeCode value={item.workTypeCode} />

                  <IconButton
                    onClick={() =>
                      navigate("/tickets/Details", {
                        state: item,
                      })
                    }
                    size="small"
                  >
                    <ArrowRight size={17} color={theme.palette.textColor} />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Box className="dashboardEmptyState">
                <Typography>No priority work right now.</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Today */}
        <Box className="dashboardPanel todayPanel">
          <Box className="dashboardPanelHeader"
          sx={{
            backgroundColor:theme.palette.PanelHeaderBackground
          }}>
            <Box>
              <Typography className="dashboardPanelTitle">Today</Typography>

              <Typography className="dashboardPanelDescription">
                Your workday at a glance.
              </Typography>
            </Box>
          </Box>

          <Box className="todayList">
            {today.length > 0 ? (
              today.map((item) => (
                <Box className="todayRow" key={item.actionCode}>
                  <Box
                    className={`todayStatus ${
                      item.requiresAttention ? "requiresAttention" : ""
                    }`}
                  />

                  <Box className="todayContent">
                    <Typography className="todayTitle">{item.title}</Typography>

                    <Typography className="todaySubtitle">
                      {item.subtitle}
                    </Typography>
                  </Box>

                  {item.actionCount > 0 && (
                    <Typography className="todayCount">
                      {item.actionCount}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <Box className="dashboardEmptyState">
                <Typography>Nothing scheduled for today.</Typography>
              </Box>
            )}
          </Box>
          <button
            type="button"
            className="todayTimesheetButton"
            onClick={() => navigate("/timeSheet")}
          >
            <Clock3 size={15} aria-hidden="true" />
            Open today’s timesheet
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
