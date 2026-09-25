import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';


const MainLayout = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [sideMenuToggle, setSideMenuToggle] = useState(true);

    const menuToggleHandler = () => {
        setMenuToggle((prev) => !prev);
    }
    const sideMenuToggleHandler = () => {
        setSideMenuToggle((prev) => !prev);
    }

    return (
        <>
            <Grid container>

                <Grid item lg={sideMenuToggle ? 2 : 0.5} display={{ xs: 'none', md: 'none', lg: 'block' }} sx={{ transition: 'all 300ms ease-in-out' }}>
                    <Sidebar
                        menuToggle={sideMenuToggle}
                        menuToggleHandler={sideMenuToggleHandler}
                        sideMenuToggle={sideMenuToggle}
                        type="sidebar"
                        sideMenu
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={sideMenuToggle ? 10 : 11.5} sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
                    <Header menuToggleHandler={menuToggleHandler} sideMenuToggle={sideMenuToggle} sideMenuToggleHandler={sideMenuToggleHandler} />
                    <Outlet />
                </Grid>
                <Sidebar
                    menuToggle={menuToggle}
                    menuToggleHandler={menuToggleHandler}
                    sideMenuToggle={sideMenuToggle}
                    type="drawer"
                    fixed
                />
            </Grid>
        </>
    );
};


export default MainLayout;