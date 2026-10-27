import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTheme } from "@emotion/react";
import "./toggleButton.scss";

const ToggleButton = (props) => {
  const {
    fieldName,
    lable,
    description,
    control,
    onChangeValue,
    rules,
    disabled,
    error,
    icon,
    noBorder,
  } = props;
  const theme = useTheme();

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const updateValue = (data) => {
          onChange(data);
          if (onChangeValue) {
            onChangeValue();
          }
        };
        return (
          <Tooltip title={rules?.required ? rules.required : ""}>
            <Box
              component="label"
              className="toggleContainerView toggle"
              sx={{
                border: noBorder
                  ? "none"
                  : `1px solid ${theme.palette.inputBorder}`,
              }}
            >
              <Box className="toggleContent">
                {icon && <Box className="toggleIcon">{icon}</Box>}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: "14px",
                    }}
                    color={error ? "red" : ""}
                  >
                    {lable}
                    {rules?.required && "*"}
                  </Typography>
                  {description && (
                    <Typography variant="caption" color="text.secondary">
                      {description}
                    </Typography>
                  )}
                </Box>
              </Box>
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(event) => updateValue(event.target.checked)}
                disabled={disabled}
                aria-label={lable}
              />
              <span className="toggleSwitch" aria-hidden="true" />
            </Box>
          </Tooltip>
        );
      }}
    />
  );
};

export default ToggleButton;
