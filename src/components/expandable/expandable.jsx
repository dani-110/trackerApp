import React from "react";
import "./expandable.scss";
import { Box, Collapse, Typography } from "@mui/material";
import { MdExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useTheme } from '@mui/material/styles';

const Expandable = (props) => {
  const { children, icon, title, optionLabel, style, childStyle, isNotOpen } = props

  const theme = useTheme();

  const [expanded, setExpanded] = React.useState(isNotOpen ? false : true);

  const handleExpandClick = () => {
    setExpanded(prev => !prev);
  };
  return <>
    <Box onClick={handleExpandClick} className="searchBar" sx={style}  >
      <Box sx={{display:'flex', alignItems:'center'}}>
        {icon&&<img src={icon} style={{ height: '30px' }} alt={'icon'} />}
        <Typography variant="h3" component="span" className="collapseableContainer">
          {title}
        </Typography>
      </Box>
      {optionLabel ? <Typography variant="body1" component="span" className="optionLabel">
        {optionLabel}
      </Typography> : <>
        {
          expanded ? <MdOutlineExpandLess size={25} color={theme.palette.textColor} />
            : <MdExpandMore size={25} color={theme.palette.textColor} />}
      </>}
    </Box >
    <Collapse
      in={expanded}
      timeout="auto"
      unmountOnExit
    >
      <Box className='childContainer' sx={childStyle}>
        {children}
      </Box>
    </Collapse>
    {/* {expanded && <Divider variant="middle" sx={{ margin: '20px 0px' }} />} */}
  </>
};

export default Expandable;
