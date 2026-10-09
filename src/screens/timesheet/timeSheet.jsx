import { Box, CircularProgress, Typography } from "@mui/material";
import DataGrid from "./dataGrid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTimeSheetByDay } from "../../store/actions/timesheet";
import { useForm } from "react-hook-form";
import DatePickerFields from "../../components/datePickerField";
import moment from "moment";
import "./timesheet.scss";
import TimeProgressChart from "./timeProgressChart";
import TimelineStatus from "../../components/timelineStatus/timelineStatus";
import PageHeader from "../../components/pageHeader/pageHeader";
import { Clock3 } from "lucide-react";

const TimeSheet = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [header, setHeader] = useState({});
  const [workItems, setWorkItems] = useState([]);

  const defaultValues = useForm({
    defaultValues: {
      day: moment().format("YYYY-MM-DD"),
    },
  });

  const { control, watch } = defaultValues;

  useEffect(() => {
    fetchList({});
  }, [watch("day")]);

  const fetchList = () => {
    setIsLoading(true);
    dispatch(getTimeSheetByDay(moment(watch("day")).format("YYYY-MM-DD"))).then(
      (res) => {
        if (res.payload.status == 200) {
          console.log(res);
          const response = res.payload.data;
          setHeader(response.header);
          setWorkItems(response.entries);
        }
        setIsLoading(false);
      },
    );
  };

  return (
    <Box className="screenPage timesheetPage">
      <PageHeader
        eyebrow="SPRINT 04 - TIME"
        title="My timesheet"
        description="Log the work, not the paperwork. Keep today accurate in a few clicks."
        action={
          <DatePickerFields
            fieldName="day"
            type="text"
            label="Day"
            control={control}
            compact
            format="ddd, DD MMM"
          />
        }
      />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <Box className="timeSheetHeaderContainer">
            <Box sx={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <TimeProgressChart data={header} />
              <Box>
                <TimelineStatus value={header.status} />
                <Typography variant="h2" className="timeSheetBannerTitle">
                  Keep today up to date
                </Typography>
                {(() => {
                  const diffMinutes =
                    header.currentMinutes - header.expectedMinutes;

                  if (diffMinutes > 0) {
                    return (
                      <Typography variant="body2" className="timeSheetBannerDescription">
                        You have completed {diffMinutes} minutes more than
                        expected!
                      </Typography>
                    );
                  }

                  return (
                    <Typography variant="body2" className="timeSheetBannerDescription">
                      {header.expectedMinutes - header.currentMinutes} minutes
                      remaining against the standard day.
                    </Typography>
                  );
                })()}
              </Box>
            </Box>
            <Box className="commitDeadline">
              <Clock3 size={18} className="commitDeadlineIcon" aria-hidden="true" />
              <Box>
                <Typography variant="body2">COMMIT DEADLINE</Typography>
                <Typography variant="h3" className="commitDeadlineTime">
                  09:00 PM
                </Typography>
                <Typography variant="body2">Asia/Karachi</Typography>
              </Box>
            </Box>
          </Box>
          <DataGrid
            list={workItems}
            header={header}
            date={watch("day")}
            fetchList={fetchList}
            isLoading={isLoading}
          />
        </>
      )}
    </Box>
  );
};
export default TimeSheet;
