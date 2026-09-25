import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { useTheme } from "@emotion/react";
import './checkboxButton.scss'
const CheckboxButton = (props) => {
    const { fieldName, lable, control, rules, disabled, error } = props;
    const theme = useTheme()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const CssCheckbox = styled(Checkbox)(({ theme }) => ({
        '.css-i4bv87-MuiSvgIcon-root': {
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
                    <>
                        <Box className='checkboxContainerView' sx={{ border: `1px solid ${theme.palette.inputBorder}` }}>
                            <Typography variant="body1">{lable}</Typography>
                            <CssCheckbox
                                sx={{ padding: '5px' }}
                                value={field.value ? field.value : false}
                                checked={field.value}
                                onChange={field.onChange}
                                required={true}
                                disabled={disabled}
                                {...label}
                            />
                            {/* <div style={{ position: 'relative', display: 'inline-block', width: '20px', height: '20px' }}>
                                <input style={{margin: '0px 5px'}} className="checkbox"
                                    value={field.value}
                                    type={'checkbox'}
                                    checked={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    ref={field.ref}
                                    placeholder={`${error ? error.message + '*' : ''}`}
                                    required={(rules?.required) && true}
                                />
                            </div> */}
                        </Box>
                        {error && (
                            <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                                {`* ${error.message}`}
                            </Typography>
                        )}
                    </>
                );
            }}
        />
    )
};

export default CheckboxButton;
