import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Clock3, Hourglass, Check } from "lucide-react";
import PageHeader from "../../components/pageHeader/pageHeader";
import moment from "moment";

const mockNotifications = [
  {
    notificationId: "1",
    eventType: "TIMESHEET_OVERDUE",
    renderedSubject: "Overdue timesheet - Today",
    renderedBody:
      "No work was logged and your timesheet was not committed by the configured deadline.",
    createdAt: "2026-10-16T16:37:39.003Z",
    readAt: null,
  },
  {
    notificationId: "2",
    eventType: "TIMESHEET_PRE_DEADLINE_REMINDER",
    renderedSubject: "Timesheet reminder - Today",
    renderedBody:
      "Please add your work entries and commit your timesheet before the deadline.",
    createdAt: "2026-10-16T15:37:39.003Z",
    readAt: null,
  },
  {
    notificationId: "3",
    eventType: "TIMESHEET_OVERDUE",
    renderedSubject: "Overdue timesheet - 2 days ago",
    renderedBody:
      "Your timesheet was not committed by the configured deadline.",
    createdAt: "2026-10-14T16:37:23.227Z",
    readAt: "2026-10-14T18:00:00.000Z",
  },
];

const Notification = () => {
  const theme = useTheme();

  const [notificationList, setNotificationList] = useState(mockNotifications);

  const unreadCount = notificationList.filter(
    (notification) => notification.readAt == null,
  ).length;

  const handleMarkAllRead = () => {
    setNotificationList((previous) =>
      previous.map((notification) => ({
        ...notification,
        readAt: notification.readAt ?? new Date().toISOString(),
      })),
    );
  };

  return (
    <Box className="screenPage approvalsPage">
      <Box sx={{ width: "90%", mx: "auto" }}>
        <PageHeader
          eyebrow="INBOX"
          title="Notification"
          description="Important Updates"
          action={
            <Button
              startIcon={<Check size={15} />}
              variant="outlined"
              disabled={unreadCount === 0}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </Button>
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        ></Box>

        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {notificationList.length === 0 ? (
            <Typography sx={{ p: 3, textAlign: "center" }}>
              No notifications
            </Typography>
          ) : (
            notificationList.map((notification) => {
              const isUnread = notification.readAt == null;
              const isOverdue = notification.eventType === "TIMESHEET_OVERDUE";

              return (
                <Box
                  key={notification.notificationId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.25,
                    py: 1.75,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: isUnread
                      ? theme.palette.unreadNotificationBackground
                      : theme.palette.background.paper,
                    "&:last-child": {
                      borderBottom: 0,
                    },
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
                      bgcolor: isOverdue ? "#ffe0db" : "#fff4db",
                      color: isOverdue ? "#b80000" : "#b86b00",
                    }}
                  >
                    {isOverdue ? <Clock3 size={19} /> : <Hourglass size={19} />}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        color: theme.palette.text.primary,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {notification.renderedSubject}
                    </Typography>

                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: 12,
                      }}
                    >
                      {notification.renderedBody}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: 11,
                        }}
                      >
                        {notification.createdAt
                          ? moment(notification.createdAt).fromNow()
                          : ""}
                      </Typography>

                      <Typography
                        sx={{
                          color: isOverdue ? "#d32f2f" : "#b86b00",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {isOverdue ? "Overdue" : "Due soon"}
                      </Typography>
                    </Box>
                  </Box>

                  {isUnread && (
                    <Box
                      sx={{
                        backgroundColor: theme.palette.unreadNotificationDot,
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        flex: "0 0 7px",
                      }}
                    />
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
