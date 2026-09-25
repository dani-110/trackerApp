import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Controller } from "react-hook-form";

const InlineInputFields = ({ error, type, fieldName, control, rules, label, phone, disabled, inputProps, helperText, color, ...rest }) => {
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
              {type == 'date' && <Typography sx={{ 'borderBottom': `1px solid ${color ? color : theme.palette.textColor}`, width: '50%', height:'17px' }} variant="body2" component="span">{field.value?moment(field.value).format('DD-MM-YYYY'):''}</Typography>}
              <input style={{ 'border': 'none', 'outline': 'none', width: type == 'date' ? '3%' : '50%', backgroundColor: 'transparent', 'borderBottom': `1px solid ${color ? color : theme.palette.textColor}`, }}
                value={type !== 'date' ? field.value : ''}
                checked={field.value}
                type={type}
                onChange={field.onChange}
                disabled={disabled}
                ref={field.ref}
                placeholder={`${error ? error.message + '*' : ''}`}
                required={(rules?.required) && true}
              />
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

export default InlineInputFields;
