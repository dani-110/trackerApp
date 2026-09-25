import React, { useState } from "react";
import { Popover, Box, Divider, List, ListItemButton, ListItemText, IconButton, useTheme } from "@mui/material";
import { MdMoreVert } from "react-icons/md";

const CustomPopover = ({
    title = "Select Action",
    options = [],
    onSelectComponent
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option) => {
        if (onSelectComponent && option.componentToRender) {
            onSelectComponent(option.componentToRender);
        }
        if (option.onClick) {
            option.onClick();
        }
        handleClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Box>
            <IconButton onClick={handleClick} size="small">
                <MdMoreVert size={20} color={theme.palette.textColor} />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        ml: 1,
                        overflow: "visible",
                        borderRadius: "6px",
                        border: "1px solid #d3d3d3",
                        backgroundColor: theme.palette.popoverHeader,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -6,
                            right: 12,
                            width: 10,
                            height: 10,
                            backgroundColor: theme.palette.popoverHeader,
                            borderLeft: "1px solid #d3d3d3",
                            borderTop: "1px solid #d3d3d3",
                            transform: "rotate(45deg)",
                            zIndex: 1,
                        },
                    },
                }}
            >
                <Box sx={{ backgroundColor: theme.palette.popoverHeader, px: 2, py: 1, borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}>
                    <Box sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        {title}
                    </Box>
                </Box>

                <Divider />

                <List disablePadding sx={{ backgroundColor: theme.palette.backgroundColor }}>
                    {options.map((option, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            sx={{
                                py: 0.8,
                                px: 2,
                                "&:hover": { backgroundColor: theme.palette.popoverHeader},
                            }}
                        >
                            <ListItemText
                                primary={option.label}
                                primaryTypographyProps={{ fontSize: "13px" }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};

export default CustomPopover;