
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
import Card from "../card/Card";
import './tabs.scss'

const Tabs = (props) => {
    const { childArray, changeTab, checkData, content, setTabValue } = props
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const breadCrumCtxt = useContext(BreadCrumSelectorContext)

    useEffect(() => {
        breadCrumCtxt.breadCrumSelectorAddHandler(childArray[0]?.label + " tabs")
    }, [])

    useEffect(() => {
        if (changeTab) {
            setValue(value + 1)
        }
    }, [changeTab])

    const handleChange = (event, newValue) => {
        if (setTabValue) {
            setTabValue(newValue)
        }
        if (checkData) {
            if (checkData(value, newValue)) {
                breadCrumCtxt.onChangeTabHandler(childArray[newValue].label + " tabs")
                setValue(newValue);
            }
        } else {
            breadCrumCtxt.onChangeTabHandler(childArray[newValue].label + " tabs")
            setValue(newValue);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '85vh', typography: 'body1', display: 'flex', flexDirection: 'column' }}>
            <TabContext value={value}>
                <Box sx={{ display: 'flex' }}>
                    <TabList
                        //  indicatorColor='secondary' textColor='secondary'
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider', // Full width line ke liye (ya koi bhi custom color jaise '#e0e0e0')
                            width: '100%'
                        }}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: theme.palette.selectedTab,
                                height: '3px',
                            }
                        }}

                        onChange={handleChange}>
                        {
                            childArray.map((item, index) => (
                                <Tab sx={{
                                    fontSize: '15px',
                                    color: theme.palette.tabText,
                                    fontWeight: 500,
                                    '&.Mui-selected': {
                                        color: theme.palette.selectedTabText,
                                    }
                                }} label={item.label} value={index} />
                            ))
                        }
                    </TabList>
                    {content && content()}
                </Box>
                {
                    childArray.map((item, index) => (
                        <TabPanel value={index}
                            sx={{
                                flex: 1,
                                height: '100%',
                                padding: '16px 0px 0px 0px', // Padding apne hisab se adjust kar sakte hain
                                display: value === index ? 'flex' : 'none', // Active panel ko flex banayega
                                flexDirection: 'column'
                            }}
                        >{item.component}</TabPanel>
                    ))}
            </TabContext>
        </Box>
    )
};

export default Tabs;
