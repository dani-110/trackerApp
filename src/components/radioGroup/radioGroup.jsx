import React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const RadioGroupButton = (props) => {
    const { fieldName, label, control, list, rules, error } = props;
    return (
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field }) => {
                return (
                    <FormControl className="">
                        {/* <Typography variant="body1" color={error ? 'red' : ''}>{label}{rules?.required && '*'}:</Typography> */}
                        <Tooltip title={rules?.required ? rules.required : ""}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={field.value}
                                onChange={field.onChange}
                            >
                                {
                                    list.map((item, i) => (
                                        <FormControlLabel value={item} control={<Radio />} label={item} />
                                    ))
                                }
                            </RadioGroup>
                        </Tooltip>
                    </FormControl>
                );
            }}
        />
    )
};

export default RadioGroupButton;
