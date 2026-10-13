import { TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { styled,useTheme} from '@mui/material/styles';

const CssTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.inputLabelFocusedColor,
  },
  "& .MuiOutlinedInput-root": {
    minHeight: 46,
    borderRadius: "10px",
    backgroundColor: theme.palette.inputBackgroundColor,
    "& fieldset": {
      borderColor: theme.palette.inputBorder,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.inputFocusedColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.inputFocusedColor,
    },
    "& input::placeholder": {
  color: "#8a94a6",
  opacity: 1,
}
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.textColor
  },
}));

const TextAreaFields = ({ error, type, fieldName, control, rules, label, phone, disabled, rows, helperText, ...rest }) => {
  const theme = useTheme(); 
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <Tooltip title={rules?.required ? rules.required : ""}>
            <Typography variant="body1" sx={{ marginBottom: '6px', color: theme.palette.inputLabelColor,fontWeight: "500", textAlign: 'left' }}>{`${label}${rules?.required ? '*' : ''}`}</Typography>
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
