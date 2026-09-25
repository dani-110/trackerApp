import React from "react";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { useTheme } from "@emotion/react";
import './toggleButton.scss'

const ToggleButton = (props) => {
    const { fieldName, lable, control, onChangeValue, rules, disabled, error } = props;
    const theme = useTheme()

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const CssSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase': {
            color: theme.palette.switchBase,
        },
        '& .MuiSwitch-switchBase+ .MuiSwitch-track': {
            backgroundColor: theme.palette.switchBase,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: theme.palette.secondary.main,
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: theme.palette.secondary.main,
        },
    }));
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => {
                const updateValue = (data) => {
                    onChange(data)
                    if (onChangeValue) {
                        onChangeValue()
                    }
                }
                return (
                    <Tooltip title={rules?.required ? rules.required : ""}>
                        <Box className='toggleContainerView' sx={{ border: `1px solid ${theme.palette.inputBorder}` }}>
                            <Typography variant="body2" color={error ? 'red' : ''}>{lable}{rules?.required && '*'}</Typography>
                            <CssSwitch
                                value={value ? value : false}
                                checked={value}
                                onChange={(_, data) => updateValue(data)}
                                required={true}
                                disabled={disabled}
                                {...label} />
                            {/* <label class="switch">
                                <input type="checkbox" value={field.value ? field.value : false}
                                    checked={field.value}
                                    onChange={field.onChange}
                                    required={true}
                                    disabled={disabled}
                                    {...label} />
                                <span class="slider round"></span>
                            </label> */}
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

export default ToggleButton;
