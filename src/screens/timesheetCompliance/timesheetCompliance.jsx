import { Box, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { complianceStatus } from "../../store/actions/timesheet";
import { useForm } from "react-hook-form";
import moment from "moment";
import DatePickerFields from "../../components/datePickerField";

const TimesheetCompliance = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState({});


    const defaultValues = useForm({
        defaultValues: {
            day: moment().format('YYYY-MM-DD'),
        },
    });


    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        reset,
        setValue,
        resetField,
        getValues,
        formState: { errors },
    } = defaultValues;

    useEffect(() => {
        fetchList({})
    }, [watch('day')])

    const fetchList = (rowsPerPage, page) => {
        const data = {
            date: moment(watch('day')).format('YYYY-MM-DD'),
        }

        if (Object.keys(data).length > 0) {
            data["pageSize"] = 10
            data["page"] = 1
            setSearchData(data)
        }
        setIsLoading(true)
        const isData = Object.keys(data).length > 0
        if (rowsPerPage) {
            searchData["pageSize"] = rowsPerPage
            searchData["page"] = page + 1
        }
        dispatch(complianceStatus(isData ? data : searchData)).then((res) => {
            console.log(res)
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">Timesheet Compliance</Typography>
                <Typography variant="body1">See who is done, who needs a reminder, and where follow-up is required.</Typography>
            </Box>
            <DatePickerFields
                fieldName="day"
                type="text"
                label="Day"
                control={control}
            />
        </Box>
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default TimesheetCompliance;
