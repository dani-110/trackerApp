import { Box, Typography } from "@mui/material";
import "./pageHeader.scss";

const PageHeader = ({ eyebrow = "ADMINISTRATION", title, description, action }) => (
  <Box className="pageHeader">
    <Box className="pageHeaderText">
      <Typography className="pageHeaderEyebrow">{eyebrow}</Typography>
      <Typography component="h1" className="pageHeaderTitle">
        {title}
      </Typography>
      {description && (
        <Typography className="pageHeaderDescription">
          {description}
        </Typography>
      )}
    </Box>
    {action && <Box className="pageHeaderAction">{action}</Box>}
  </Box>
);

export default PageHeader;
