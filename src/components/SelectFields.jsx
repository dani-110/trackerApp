import React, { useState } from "react";
import { Autocomplete, TextField, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";

const CssAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.inputLabelFocusedColor,
  },
  "& .MuiOutlinedInput-root": {
    minHeight: 46,
    borderRadius: "10px",
    backgroundColor: theme.palette.inputBackgroundColor,
    transition: "box-shadow 120ms ease, background-color 120ms ease",
    "& fieldset": {
      borderColor: theme.palette.inputBorder,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.inputFocusedColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.inputFocusedColor,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 3px ${theme.palette.inputFocusRing}`,
    },
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    color: theme.palette.textColor,
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.textColor,
  },
}));

const SelectFields = (props) => {
  const {
    label,
    fieldName,
    onChangeValue,
    control,
    options,
    rules,
    error,
    disabled,
    filterEndPoint,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState(options);
  const theme = useTheme();
  const dispatch = useDispatch();

  const fetchFilter = () => {
    if (options?.length === 0 && filterEndPoint) {
      setIsLoading(true);
      dispatch(filterEndPoint({})).then((res) => {
        setIsLoading(false);
        setList(
          res.payload.map(({ displayvalue, codevalue }) => {
            return { label: displayvalue, value: codevalue };
          }),
        );
      });
    }
  };
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const updateValue = (data) => {
          onChange(data ? String(data.value) : "");
          if (onChangeValue) {
            onChangeValue();
          }
        };
        return (
          <Tooltip title={rules?.required ? rules.required : ""}>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "6px",
                color: theme.palette.inputLabelColor,
                fontWeight: "500",
                textAlign: "left",
              }}
            >{`${label}${rules?.required ? "*" : ""}`}</Typography>
            <CssAutocomplete
              size="small"
              componentsProps={{
                paper: {
                  sx: {
                    bgcolor: theme.palette.backgroundBaseColor,
                    "& .MuiAutocomplete-option:hover, & .MuiAutocomplete-option.Mui-focused":
                      {
                        background: theme.palette.ticketActiveBackground,
                        color: "#ffffff",
                      },
                    "& .MuiAutocomplete-option[aria-selected='true']": {
                      bgcolor: theme.palette.ticketFilterChipActiveBackground,
                    },
                    "& .MuiAutocomplete-option[aria-selected='true']:hover": {
                      bgcolor: theme.palette.ticketFilterChipActiveBackground,
                    },
                  },
                },
              }}
              disabled={disabled}
              options={list}
              loading={isLoading}
              loadingText="Loading..."
              onChange={(_, data) => updateValue(data)}
              value={value ? value : null}
              getOptionLabel={(option) => {
                if (option?.label) {
                  return option?.label;
                } else if (option) {
                  return list?.find((e) => e.value === option)?.label || "";
                }
                return "";
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  onFocus={() => fetchFilter()}
                  autoComplete="off"
                  required={!!rules?.required}
                />
              )}
              isOptionEqualToValue={(option, value) => {
                if (value.value) {
                  return option.value === value.value;
                } else if (value) {
                  return option.value === value;
                }
              }}
            />
          </Tooltip>
        );
      }}
    />
  );
};

export default SelectFields;
