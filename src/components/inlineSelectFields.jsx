import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InlineSelectFields = ({ error, type, fieldName, control, rules, options, label, phone, disabled, inputProps, helperText, color, ...rest }) => {
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
              <Typography sx={{ marginRight: '10px', color: `${color ? color : theme.palette.textColor}` }} variant="body1" component="span">{label}:</Typography>
              <select
                style={{ 'border': 'none', 'outline': 'none', width: '50%', backgroundColor: 'transparent', 'borderBottom': `1px solid ${color ? color : theme.palette.textColor}`, }}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                ref={field.ref}
                required={(rules?.required) && true}
              >
                <>
                  <option value="">Select an option</option>
                  {options.map(({ value, label }, index) => (
                    <option key={index} value={value}>{label}</option>
                  ))}
                </>
              </select>
            </Box>
            {error && (
              <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                {`${error.message}*`}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
};

export default InlineSelectFields;
