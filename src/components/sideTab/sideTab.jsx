
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { Box, Tab } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { useTheme } from '@mui/material/styles';
// import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
// import Card from "../card/Card";
// import './sideTab.scss'

// const SideTab = (props) => {
//     const { childArray } = props
//     const theme = useTheme();
//     const [value, setValue] = React.useState(0);
//     const breadCrumCtxt = useContext(BreadCrumSelectorContext)

//     useEffect(() => {
//         breadCrumCtxt.breadCrumSelectorAddHandler(childArray[0].label + " tabs")
//     }, [])

//     const handleChange = (event, newValue) => {
//         breadCrumCtxt.onChangeTabHandler(childArray[newValue].label + " tabs")
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ width: '100%', typography: 'body1' }}>
//             <TabContext value={value}>
//                 <TabList variant="scrollable" sx={{
//                     '& .Mui-selected': {
//                         color: theme.palette.secondary.main, // Selected tab color
//                     },
//                     '& .MuiTab-root': {
//                         color: theme.palette.textColor, // Unselected tab color
//                     },
//                 }}
//                     onChange={handleChange}>
//                     {
//                         childArray.map((item, index) => (
//                             <Tab sx={{ fontSize: '15px' }} label={item.label} value={index} />
//                         ))
//                     }
//                 </TabList>
//                 {
//                     childArray.map((item, index) => (

//                         <TabPanel value={index}>{item.component}</TabPanel>
//                     ))}
//             </TabContext>
//         </Box>
//     )
// };

// export default SideTab;

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { BreadCrumSelectorContext } from '../../store/context/breadCrumSelector';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ flex: 1, width: '100px' }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function SideTab(props) {
    const { childArray, tabValue, searchValue, search, auditTrace, onClickChange } = props
    const theme = useTheme()
    const [value, setValue] = React.useState(tabValue >= 0 ? tabValue : 0);
    const breadCrumCtxt = React.useContext(BreadCrumSelectorContext)

    React.useEffect(() => {
        if (childArray.length > 0 && auditTrace) {
            breadCrumCtxt.breadCrumSelectorAddHandler(childArray[0]?.label + " tabs")
        }
    }, [])
    React.useEffect(() => {
        if (searchValue && searchValue?.length > 0) {
            setValue(null)
        }
    }, [searchValue])

    const handleChange = (event, newValue) => {
        if (auditTrace) {
            breadCrumCtxt.onChangeTabHandler(childArray[newValue].label + " tabs")
        }
        // setValue(newValue)
        if (onClickChange) {
            setValue(newValue);
        } else {
            setValue(tabValue >= 0 ? tabValue : newValue);
        }
    };

    return (
        <Box>
            <Box sx={{ maxWidth: '200px' }}>
                {search && search}
            </Box>

            <Box
                sx={{ flexGrow: 1, bgcolor: 'background', display: 'flex', height: '70vh' }}
            >

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: theme.palette.textColor }}
                    textColor='secondary'
                    indicatorColor='secondary'

                >

                    {
                        childArray?.map((item, index) => (
                            <Tab sx={{ fontSize: '12px', color: theme.palette.textColor, maxWidth: '200px' }} label={item.label}{...a11yProps(index)} />
                        ))
                    }
                </Tabs>
                {
                    childArray?.map((item, index) => (
                        // { React.cloneElement(item.component, { customProp }) }
                        <TabPanel value={value} index={index} key={index} >
                            {React.cloneElement(item.component, { setValue })}
                        </TabPanel>
                        // <TabPanel value={value} index={index}>{item.component}</TabPanel>
                    ))
                }
            </Box >
        </Box>
    );
}
