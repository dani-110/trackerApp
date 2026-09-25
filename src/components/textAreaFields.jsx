import { TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)(({ theme }) => ({
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
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.textColor
  },
}));

const TextAreaFields = ({ error, type, fieldName, control, rules, label, phone, disabled, rows, helperText, ...rest }) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <Tooltip title={rules?.required ? rules.required : ""}>
            <Typography variant="body1" sx={{ marginBottom: '6px', color: '#6c757d', textAlign: 'left' }}>{`${label}${rules?.required ? '*' : ''}`}</Typography>
            <CssTextField
              size="small"
              className="outlined"
              required={(rules?.required) && true}
              variant="outlined"
              error={error && true}
              // helperText={error ? error.message : " "}
              type={type}
              inputRef={field.ref}
              // label={label}
              value={field.value}
              onChange={field.onChange}
              fullWidth
              disabled={disabled}
              autoComplete=""
              multiline
              rows={rows ? rows : 5}
              {...rest}
            />
          </Tooltip>
        );
      }}
    />
  );
};

export default TextAreaFields;
