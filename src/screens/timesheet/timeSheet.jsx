import { Box, Button, CircularProgress, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTimeSheetByDay } from "../../store/actions/timesheet";
import { useForm } from "react-hook-form";
import DatePickerFields from "../../components/datePickerField";
import moment from "moment";
import './timesheet.scss'
import TimeProgressChart from "./timeProgressChart";
import Status from "../../components/status/status";
import TimelineStatus from "../../components/timelineStatus/timelineStatus";

const TimeSheet = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [header, setHeader] = useState({});
    const [workItems, setWorkItems] = useState([]);

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

    const fetchList = () => {
        setIsLoading(true)
        dispatch(getTimeSheetByDay(moment(watch('day')).format('YYYY-MM-DD'))).then((res) => {
            if (res.payload.status == 200) {
                console.log(res)
                const response = res.payload.data
                setHeader(response.header)
                setWorkItems(response.entries)
            }
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="h2">My TimeSheet</Typography>
                <Typography variant="body1">Log the work, not the paperwork. Keep today accurate in a few clicks.</Typography>
            </Box>
            <DatePickerFields
                fieldName="day"
                type="text"
                label="Day"
                control={control}
            />
        </Box>
        {isLoading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                <CircularProgress size={50} />
            </Box>
            : <>
                <Box className='timeSheetHeaderContainer'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TimeProgressChart data={header} />
                        <Box>
                            <TimelineStatus value={header.status} />
                            <Typography variant="h2" color={'#fff'} sx={{ margin: '5px 0px' }}>Keep today up to date</Typography>
                            {(() => {
                                const diffMinutes = header.currentMinutes - header.expectedMinutes;

                                if (diffMinutes > 0) {
                                    return (
                                        <Typography variant="body2">
                                            You have completed {diffMinutes} minutes more than expected!
                                        </Typography>
                                    );
                                }

                                return (
                                    <Typography variant="body2">
                                        {header.expectedMinutes - header.currentMinutes} minutes remaining against the standard day.
                                    </Typography>
                                );
                            })()}
                        </Box>
                    </Box>
                    <Box className="commitDeadline">
                        <Box>
                            <Typography variant="body2">COMMIT DEADLINE</Typography>
                            <Typography variant="h3" color='#fff'>09:00 PM</Typography>
                            <Typography variant="body2">Asia/Karachi</Typography>
                        </Box>
                    </Box>
                </Box>
                <DataGrid list={workItems} header={header} date={watch('day')} fetchList={fetchList} isLoading={isLoading} />
            </>}
    </Box>
};
export default TimeSheet;
