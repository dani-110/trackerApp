import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Typography, Slide, useTheme } from "@mui/material";
import { uiActions } from "../store/reducers/ui-slice";

const Notification = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { notification } = useSelector((state) => state.ui);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification) {
      setShow(true);  // Slide in when notification appears

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShow(false); // Slide out before hiding
        setTimeout(() => {
          dispatch(uiActions.hideNotification());
        }, 500); // Wait for the slide-out animation to complete
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const isDark = theme.palette.mode === "dark";
  const notificationColors = isDark
    ? {
        success: { background: "#123b2b", foreground: "#d7f8e7", border: "#28764f" },
        error: { background: "#482128", foreground: "#ffe3e5", border: "#a44450" },
        warning: { background: "#493719", foreground: "#fff1cf", border: "#94702b" },
        info: { background: "#15364d", foreground: "#d8efff", border: "#39769c" },
      }
    : {};
  const colors = notificationColors[props?.status];

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Alert
        sx={{
          borderRadius: "9px",
          position: "fixed",
          left: 16,
          right: 16,
          top: 10,
          width: "auto",
          maxWidth: 480,
          margin: "0 auto",
          zIndex: 1301,
          ...(colors && {
            backgroundColor: colors.background,
            color: colors.foreground,
            border: `1px solid ${colors.border}`,
            "& .MuiAlert-icon": { color: colors.foreground },
          }),
        }}
        severity={props?.status}
      >
        {/* <AlertTitle sx={{ fontSize: "13px", color: '#000' }}>{props?.title}</AlertTitle> */}
        <Typography variant="h5" sx={{ fontSize: "14px", color: "inherit", overflowWrap: "anywhere" }}>{props?.message ? props?.message : props?.title}</Typography>
      </Alert>
    </Slide>
  );
};

export default Notification;
