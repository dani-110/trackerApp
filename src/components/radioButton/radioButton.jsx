import React from "react";
import { Box, Radio, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';

const RadioButton = (props) => {
    const { fieldName, lable, control, rules, disabled, error } = props;

    const label = { inputProps: { 'aria-label': 'object' } };
    const CssRadio = styled(Radio)(({ theme }) => ({
        '.css-1hbvpl3-MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
        },
        '.css-11zohuh-MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
        },
    }));
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field }) => {
                return (
                    <Tooltip title={rules?.required ? rules.required : ""}>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <Typography variant="body2">{lable}</Typography>
                            <CssRadio
                                value={field.value ? field.value : false}
                                checked={field.value}
                                onChange={field.onChange}
                                required={true}
                                disabled={disabled}
                                {...label}
                            />
                        </Box>
                        {/* {error && (
                            <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                                {`* ${error.message}`}
                            </Typography>
                        )} */}
                    </Tooltip>
                );
            }}
        />
    )
};

export default RadioButton;
