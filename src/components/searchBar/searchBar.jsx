import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { IoIosSearch } from "react-icons/io";
import { TextField } from '@mui/material';
import Input from '@mui/material/Input';
import './searchBar.scss'
import { useTheme } from '@emotion/react';

export default function SearchBar(props) {
    const theme = useTheme();
    const { placeholder, handleChange } = props

    return (
        <Box className="searchBarContainer">
            <Input style={{width:'70%', margin:'0px 10px'}} placeholder={placeholder} disableUnderline onChange={(e) => handleChange(e.target.value)} />
            <Box className='iconContainer' style={{background:theme.palette.secondary.main}}>
                <IoIosSearch color='#fff' size={18} />
            </Box>
        </Box>
    );
}