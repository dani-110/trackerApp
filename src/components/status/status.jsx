import React from "react";
import { Box, Typography } from "@mui/material";

export const getStatusStyle = (value) => {
  const status = String(value ?? "").trim().toUpperCase();

  const colors = {
    NEW: { background: "#e4f6ee", color: "#008765" },
    ACTIVE: { background: "#e4f6ee", color: "#008765" },
    INACTIVE: { background: "#eef1f5", color: "#607086" },
    DISABLED: { background: "#eef1f5", color: "#607086" },
    PENDING: { background: "#fff3d6", color: "#a96700" },
    LOCKED: { background: "#e5efff", color: "#2764c5" },
  };

  return colors[status] || {
    background: "#eef1f5",
    color: "#607086",
  };
};

const Status = ({ value }) => {
  const status = String(value ?? "").trim().toUpperCase();
  const style = getStatusStyle(status);

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        borderRadius: "999px",
        px: 1.1,
        py: 0.35,
        backgroundColor: style.background,
      }}
    >
      <Typography
        component="span"
        sx={{
          color: style.color,
          fontSize: 10,
          fontWeight: 500,
          lineHeight: 1.2,
          textTransform: "uppercase",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};

export default Status;
