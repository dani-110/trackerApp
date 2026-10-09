import { Box } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { complianceStatus } from "../../store/actions/timesheet";
import { useForm } from "react-hook-form";
import moment from "moment";
import DatePickerFields from "../../components/datePickerField";
import PageHeader from "../../components/pageHeader/pageHeader";
import "./timesheetCompliance.scss";

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

    return <Box className="screenPage timesheetCompliancePage">
        <PageHeader
            eyebrow="TIME TRACKING"
            title="Timesheet Compliance"
            description="See who is done, who needs a reminder, and where follow-up is required."
            action={
            <DatePickerFields
                fieldName="day"
                type="text"
                label="Day"
                control={control}
            />
            }
        />
        <DataGrid fetchList={fetchList} isLoading={isLoading} />
    </Box>
};
export default TimesheetCompliance;
