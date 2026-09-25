import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { Box, InputAdornment, Tooltip, Typography, colors } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';

const CssDatePicker = styled(DatePicker)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.inputLabelFocusedColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.inputFieldsetColor,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.inputFocusedColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.inputFocusedColor,
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error ? theme.palette.error.main : '#d32f2f',
    },
    '&:hover.Mui-error fieldset': {
      borderColor: theme.palette.error ? theme.palette.error.main : '#d32f2f',
    },
  }

}));
const DatePickerFields = ({ error, type, fieldName, control, minDate, rules, label, phone, disabled, helperText, ...rest }) => {
  const theme = useTheme()
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const isError = Boolean(error || fieldState.error);
        return (
          <Tooltip
            title={rules && rules.required ? rules.required : ""}
            disableHoverListener={isPickerOpen}

          >
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="body1" sx={{ marginBottom: '6px', color: '#6c757d', textAlign: 'left' }}>{`${label}${rules?.required ? '*' : ''}`}</Typography>
                <CssDatePicker
                  format="DD/MM/YYYY"
                  slotProps={{
                    layout: { sx: { bgcolor: theme.palette.headerBackgroundColor } },
                    leftArrowIcon: { sx: { color: theme.palette.textColor } },
                    rightArrowIcon: { sx: { color: theme.palette.textColor } },
                    switchViewIcon: { sx: { color: theme.palette.textColor } },
                    openPickerIcon: { sx: { color: theme.palette.textColor } },
                    textField: {
                      size: 'small',
                      error: isError,
                    }
                  }}
                  className="outlined"
                  inputRef={field.ref}
                  // label={`${label}${rules?.required ? '*' : ''}`}
                  value={field.value ? dayjs(field.value) : null}
                  minDate={minDate ? dayjs(minDate) : null}
                  onChange={e => e ? field.onChange(String(e)) : field.onChange('')}
                  onOpen={() => setIsPickerOpen(true)}
                  onClose={() => setIsPickerOpen(false)}
                  disabled={disabled}
                  {...rest}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              {/* {error && (
              <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                {`${error.message}`}
              </Typography>
            )} */}
            </Box>
          </Tooltip>
        );
      }}
    />
  );
};

export default DatePickerFields;
