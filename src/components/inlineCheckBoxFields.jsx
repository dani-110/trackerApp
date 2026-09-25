import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InlineCheckBoxFields = ({ error, type, fieldName, control, rules, label, value, phone, disabled, inputProps, helperText, ...rest }) => {
  const theme = useTheme()
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <>
            <Box sx={{ display: 'flex', 'alignItems': 'center' }}>
              <input style={{ 'border': 'none', 'outline': 'none', backgroundColor: 'transparent', 'borderBottom': `1px solid ${error ? 'red' : 'black'}`, }}
                value={field.value}
                type={'checkbox'}
                onChange={field.onChange}
                disabled={disabled}
                ref={field.ref}
                placeholder={`${error ? error.message + '*' : ''}`}
                required={(rules?.required) && true}
              />
              <Typography sx={{ marginRight: '10px', fontWeight:'bold', color: `${error ? 'red' : 'theme.palette.textColor'}` }} variant="body1" component="span">{label}:</Typography>
              {value && <Typography sx={{ marginRight: '10px', color: `${error ? 'red' : 'theme.palette.textColor'}` }} variant="body1" component="span">{value}</Typography>}
            </Box>
            {/* {error && (
              <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                {`${error.message}*`}
              </Typography>
            )} */}
          </>
        );
      }}
    />
  );
};

export default InlineCheckBoxFields;
