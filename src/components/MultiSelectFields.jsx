import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { styled, useTheme } from '@mui/material/styles';
import { LuSquare, LuSquareCheck } from "react-icons/lu";
import { useDispatch } from "react-redux";

const CssAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.inputLabelFocusedColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.inputBorderColor,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.inputFocusedColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.inputFocusedColor,
    },
  },
  '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
    color: theme.palette.textColor,
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.textColor
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.textColor
  }
}));

const MultiSelectFields = ({
  label,
  fieldName,
  control,
  options,
  rules,
  error,
  disabled,
  isShownCheck,
  filterEndPoint,
  mapperName,
  mapperId,
  initailList,
  getValueName,
  setValue
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState(options);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const theme = useTheme()
  const dispatch = useDispatch();
  const debounceRef = useRef(null);

  useEffect(() => {
    console.log(initailList)
    if (initailList && options?.length === 0 && filterEndPoint) {
      setList(initailList)
      if (setValue && getValueName) {
        console.log(fieldName, getValueName)
        setValue(fieldName, getValueName)
      }
    }

  }, [initailList])


  const fetchFilter = (search, page = 1) => {
    console.log(search)
    if (options?.length == 0 && filterEndPoint) {
      setIsLoading(true)
      dispatch(filterEndPoint({
        "text": search,
        "recordcount": 50,
        "pagenumber": pageNumber
      })).then(async res => {
        setIsLoading(false)
        console.log(res.payload,)
        const selected = list.map(val => val.value)
        const resp = res.payload.filter(val => !selected?.includes(val.id)).map((e) => {
          return { label: e[mapperName], value: e[mapperId] };
        })
        // setList(prev => [...prev, ...resp])

        await setList(prev => {
          const existingValues = new Set(prev.map(item => item.value));
          const uniqueNewItems = resp.filter(item => !existingValues.has(item.value));

          return [...prev, ...uniqueNewItems];
        })
        if (setValue && getValueName) {
          setTimeout(() => {
            setValue(fieldName, getValueName)
          }, 100)

        }
      })
    }
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        return (
          <Tooltip title={rules?.required ? rules.required : ""}>
            <Typography
              variant="body1"
              sx={{ marginBottom: "6px", color: theme.palette.inputLabelColor,fontWeight: "500", textAlign: "left" }}
            >{`${label}${rules?.required ? "*" : ""}`}</Typography>
            <CssAutocomplete
              size="small"
              componentsProps={{
                paper: { sx: { bgcolor: theme.palette.backgroundBaseColor } }
              }}
              disabled={disabled}
              options={list}
              loading={isLoading}
              loadingText="Loading..."
              multiple
              disableCloseOnSelect
              inputValue={searchText}
              onChange={(_, data) => {
                onChange(data.map(option => option.value))
                if (filterEndPoint) {
                  setSearchText('');
                }
              }}
              onInputChange={(_, val, reason) => {
                if (!filterEndPoint) return;
                if (reason !== "input") return;
                setList(prev => prev.filter(item =>
                  (value || []).includes(item.value)
                ));
                setSearchText(val);

                if (debounceRef.current) {
                  clearTimeout(debounceRef.current);
                }
                debounceRef.current = setTimeout(() => {
                  if (val.length >= 5) {
                    setPageNumber(1);
                    fetchFilter(val, 1);
                  }
                }, 500);
              }}
              noOptionsText={
                filterEndPoint
                  ? searchText.length < 5
                    ? "Enter at least 5 characters"
                    : isLoading
                      ? "Loading..."
                      : "No records found"
                  : "No options"
              }
              value={value ? list.filter(option => value.includes(option.value)) : []}
              getOptionLabel={(option) => {
                if (option.label) {
                  return option.label;
                } else if (option) {
                  return options.find(e => e.value === option)?.label || "";
                }
                return "";
              }}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps} style={{ display: 'flex', gap: '10px' }}>
                    {isShownCheck &&
                      <>
                        {selected ? <LuSquareCheck color={theme.palette.secondary.main} size={'18px'} /> : <LuSquare size={'18px'} />}
                      </>
                    }
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label={label}
                  error={error && true}
                  autoComplete="off"
                  required={(rules?.required) && true}
                />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value || option.value === value}
            />
          </Tooltip>
        )
      }}
    />
  );
};

export default MultiSelectFields;
