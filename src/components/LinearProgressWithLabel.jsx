import { Typography, Box, LinearProgress } from "@mui/material";

const LinearProgressWithLabel = ({value}) => {
  return (
   <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value || 0} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`${value || 0}%`}
                </Typography>
            </Box>
        </Box>
  );
};

export default LinearProgressWithLabel;