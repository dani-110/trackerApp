import React from "react";
import { Box, Typography } from "@mui/material";

const WorkTypeCode = ({ value }) => {
  const styles = {
    UNCLASSIFIED: { background: "#fff3d6", color: "#a96700" },
    CHANGE_REQUEST: { background: "#f1e9ff", color: "#6536c9" },
    BUG: { background: "#fee9e8", color: "#c34442" },
    SUPPORT_CASE: { background: "#e5efff", color: "#2764c5" },
  };
  const colors = styles[value?.trim()] || {
    background: "#fee9e8",
    color: "#c34442",
  };
  return (
    <Box
      sx={{
        backgroundColor: value ? colors.background : "transparent",
        borderRadius: "12px",
        padding: "2px 9px",
        display: "inline-block",
        width: "fit-content",
      }}
    >
      {" "}
      <Typography
        variant="body1"
        sx={{
          color: colors.color,
          textAlign: "center",
          fontSize: 10,
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default WorkTypeCode;
