import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import './header.scss'
import { AiOutlineMenu } from "react-icons/ai";
import Logo from '../../assests/qubitsHorizontal.png'
import UserSetting from '../../components/userSetting/userSetting';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const Header = (props) => {
    const { menuToggleHandler, sideMenuToggleHandler } = props
    const { user } = useSelector(state => state.auth)
    const theme = useTheme()

    return (
        <Grid container className='headerContainer' sx={{ bgcolor: 'headerBackgroundColor' }}>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                <Box className="toggleButton">
                    <IconButton onClick={() => {
                        menuToggleHandler()
                    }} size="small">
                        <AiOutlineMenu color={theme.palette.textColor}></AiOutlineMenu>
                    </IconButton>
                </Box>
                <Box className="sideToggleButton">
                    <IconButton onClick={() => {
                        sideMenuToggleHandler()
                    }} size="small">
                        <AiOutlineMenu color={theme.palette.textColor}></AiOutlineMenu>
                    </IconButton>
                </Box>
                {/* <img src={Logo} alt="Logo" /> */}
            </Grid>
            <Grid item xs={8} sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center' }} >
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <Box sx={{ display: 'flex', marginRight: '30px', alignItems: 'end' }}>
                        <Typography variant='h3' sx={{ marginRight: '10px' }}>Hi</Typography>
                        <Typography variant='h3' sx={{ textTransform: "capitalize" }}>{user?.username}</Typography>
                    </Box>
                    <UserSetting />
                </Box>

            </Grid>
        </Grid>
    );
};


export default Header;