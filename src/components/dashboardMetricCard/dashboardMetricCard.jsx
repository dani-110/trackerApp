import { Box, Typography } from "@mui/material";
import "./dashboardMetricCard.scss";

const DashboardMetricCard = ({
  label,
  value,
  description,
  className = "",
}) => {
  return (
    <Box className={`dashboardMetricCard ${className}`}>
      <Box className="dashboardMetricCardAccent" aria-hidden="true" />
      <Typography className="dashboardMetricCardLabel">
        {label}
      </Typography>

      <Typography className="dashboardMetricCardValue">
        {value}
      </Typography>

      {description && (
        <Typography className="dashboardMetricCardDescription">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default DashboardMetricCard;
