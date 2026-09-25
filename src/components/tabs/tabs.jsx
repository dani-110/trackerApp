
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
        <Box sx={{ width: '100%', height: '85vh', typography: 'body1', display:'flex', flexDirection:'column' }}>
            <TabContext value={value}>
                <Box sx={{ display: 'flex' }}>
                    <TabList indicatorColor='secondary' textColor='secondary'

                        onChange={handleChange}>
                        {
                            childArray.map((item, index) => (
                                <Tab sx={{ fontSize: '15px', color: theme.palette.textColor }} label={item.label} value={index} />
                            ))
                        }
                    </TabList>
                    {content && content()}
                </Box>
                {
                    childArray.map((item, index) => (
                        <TabPanel value={index}>{item.component}</TabPanel>
                    ))}
            </TabContext>
        </Box>
    )
};

export default Tabs;
