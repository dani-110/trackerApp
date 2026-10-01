import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import './header.scss'
import { AiOutlineMenu } from "react-icons/ai";
import qorbitoMark from '../../assests/qorbito-modern-flow-mark-final.png'
import UserSetting from '../../components/userSetting/userSetting';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { navBar } from '../sidebar/_profileNav';
import { LuActivity, LuBuilding2, LuLayoutDashboard, LuScrollText, LuUsers } from "react-icons/lu";
import { LuTicket } from "react-icons/lu";
import { WiTime3 } from "react-icons/wi";
import { LuShieldCheck } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    const [tab, setTab] = useState(navBar[0].label)
    const [subTab, setSubTab] = useState(navBar.find(val => val.label == tab).subTab[0].label)

    useEffect(() => {
        setSubTab(navBar.find(val => val.label == tab).subTab[0].label)
        navigate(navBar.find(val => val.label == tab).subTab[0].url);
    }, [tab])

    const subTabChange = (url, label) => {
        setSubTab(label)
        navigate(url);
    }

    const renderIcon = (iconName, isSelected, size) => {
        console.log(iconName, isSelected)
        const activeColor = "#ffff";
        const inactiveColor = "#8699ad";

        const currentColor = isSelected ? activeColor : inactiveColor;

        switch (iconName) {
            case 'LuLayoutDashboard':
                return <LuLayoutDashboard color={currentColor} size={size} />;
            case 'LuTicket':
                return <LuTicket color={currentColor} size={size} />;
            case 'WiTime3':
                return <WiTime3 color={currentColor} size={size} />;
            case 'LuShieldCheck':
                return <LuShieldCheck color={currentColor} size={size} />;
            case 'LuActivity':
                return <LuActivity color={currentColor} size={size} />;
            case 'LuUsers':
                return <LuUsers color={currentColor} size={size} />;
            case 'LuBuilding2':
                return <LuBuilding2 color={currentColor} size={size} />;
            case 'LuScrollText':
                return <LuScrollText color={currentColor} size={size} />;
        }
    }

    function QOrbitoLogo() {
        return (
            <Box className={`qorbitoLiveLogo`}>
                <img src={qorbitoMark} alt="" aria-hidden="true" />
                <span className="qorbitoLiveWord">
                    <span className='qorbitoTitle'>Orbito</span>
                    <span className='qorbitoSubtitle'>Work in motion.</span>
                </span>
            </Box>
        );
    }

    return (
        <>
            <Box className='headerContainer'>
                {QOrbitoLogo()}
                <Box sx={{ display: 'flex', gap: '10px', margin: '0px 10px' }}>
                    {
                        navBar.map(val => <Box className={`tab ${tab == val.label && 'activeTab'}`} onClick={() => setTab(val.label)} sx={{ cursor: 'pointer' }}>
                            {renderIcon(val.icon, tab === val.label, 20)}
                            <Typography sx={{ color: tab == val.label ? '#fff' : '#9aa9d6' }}>{val.label}</Typography>
                        </Box>)
                    }
                </Box>
            </Box>
            <Box className='subTabBar'>
                {navBar.find(val => val.label == tab).subTab.map(ele => <Box className={`subTab ${subTab == ele.label && 'activeSubTab'}`} onClick={() => subTabChange(ele.url, ele.label)} sx={{ cursor: 'pointer' }}>
                    {renderIcon(ele.icon, subTab === ele.label, 20)}
                    <Typography sx={{ color: subTab == ele.label ? '#fff' : '#9aa9d6' }}>{ele.label}</Typography>
                </Box>)
                }
            </Box >
        </>
    );
};


export default Header;