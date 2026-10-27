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
        success: { background: "#ecfaf2", foreground: "#17734b", border: "#c9eed9" },
        error: { background: "#fff0f0", foreground: "#b83b3b", border: "#ffd1d1" },
        warning: { background: "#fff8e7", foreground: "#94600e", border: "#ffe1a3" },
        info: { background: "#eef6ff", foreground: "#2864a4", border: "#d2e6ff" },
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
        <Typography variant="h5" sx={{ fontSize: "16px", color: "inherit", overflowWrap: "anywhere" }}>{props?.message ? props?.message : props?.title}</Typography>
      </Alert>
    </Slide>
  );
};

export default Notification;
