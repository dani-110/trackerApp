import React from "react";
import "./Card.css";
import { Box } from "@mui/material";
const Card = (props) => {
  return <Box className={`card2 ${props?.classes}`} style={props?.style} sx={{bgcolor:'backgroundColor', border:'1px solid rgb(255, 255, 255)'}}>{props.children}</Box>;
};

export default Card;
