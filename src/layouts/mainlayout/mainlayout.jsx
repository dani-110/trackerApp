import React from 'react';
import { Box } from '@mui/material';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', overflow: 'hidden' }}>
            <Header />
            <Outlet />
        </Box>
    );
};


export default MainLayout;
