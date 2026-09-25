import React, { useContext, useState } from 'react';
import { Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import './userSetting.scss'
import { IoIosNotifications, IoMdLogOut } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import { CiSettings } from "react-icons/ci";
import ThemeToggle from '../themeToggle';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/reducers/auth-slice';
import { logout } from '../../store/actions/auth';
import { ThemeSelectorContext } from '../../store/context/themeSelectore';

const UserSetting = (props) => {
    const dispatch = useDispatch();
    const themeCtxt = useContext(ThemeSelectorContext)
    const theme = useTheme()
    const { user } = useSelector(state => state.auth)

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = (path) => {
        setAnchorEl(null);
    };


    const handleUserSettingMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logoutAction = () => {
        let obj = {

        }
        themeCtxt.themeSelectorHandler(false)
        dispatch(logout(obj))
    }


    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            classes={{ list: "header-person-details-list" }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    background: theme.palette.headerBackgroundColor,
                    "& .MuiAvatar-root": {
                        width: 100,
                        height: 100,
                        ml: -0.5,
                        mr: 1,

                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 5,
                        width: 10,
                        height: 10,
                        background: theme.palette.headerBackgroundColor,
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
        >
            <Box sx={{ width: '300px', }}>
                <Box className='settingItems'>
                    <Typography variant="h4">
                        Theme mode
                    </Typography>
                    <ThemeToggle />
                </Box>
                <Box className='settingItems'>
                    <Typography variant="h4">
                        Application Version
                    </Typography>
                    <Typography variant="h4">
                        v1.0.0
                    </Typography>
                </Box>
                <Box className='settingItems'>
                    <Typography variant="h4">
                        Logout
                    </Typography>
                    <IconButton onClick={logoutAction} sx={{ width: '40px' }}>
                        <IoMdLogOut size={25} color={theme.palette.textColor} />
                    </IconButton>
                </Box>
                <Divider />
                <Typography variant="h6" sx={{ padding: '5px 10px' }}>© 2025 Qubits Informatics. All rights reserved.</Typography>
            </Box>
        </Menu>
    );
    return (
        <>
            <Box className='userSettingContainer' onClick={handleUserSettingMenuOpen}>
                <CiSettings size={25} color={theme.palette.textColor} />
            </Box>
            {renderMenu}
        </>
    );
};


export default UserSetting;