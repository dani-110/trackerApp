import { useEffect, useState } from "react";
import moment from "moment";
import { Box, Button, CircularProgress, Grid, Typography ,useTheme} from "@mui/material";
import ModalButton from "../../components/modalButton/modalButton";
import AddTime from "./addTime";
import { IoMdAdd } from "react-icons/io";
import {
  LuBriefcaseBusiness,
  LuCircleCheck,
  LuEllipsis,
  LuTimer,
} from "react-icons/lu";
import "./timesheet.scss";
import { commit, workSuggestions } from "../../store/actions/timesheet";
import { useDispatch } from "react-redux";

const DataGrid = (props) => {
  const { list, header, date, fetchList } = props;
  const dispatch = useDispatch();
  const theme=useTheme();

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [workTypes, setWorkTypes] = useState([]);
  const [loader, setLoader] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [selectWorkId, setSelectWorkId] = useState(null);
  const [selectEntries, setSelectEntries] = useState(null);

  useEffect(() => {
    console.log(list);
    let arr = [];
    list.forEach((ele) => {
      const obj = { ...ele };
      obj["createdAtValue"] = moment(ele.createdAt).format("DD MMM YYYY");
      obj["status"] = ele.isActive ? "Active" : "Not Active";
      arr.push(obj);
    });
    setDataList(arr);
  }, [list]);

  useEffect(() => {
    setLoader(true);
    dispatch(workSuggestions(moment(date).format("YYYY-MM-DD"))).then((res) => {
      console.log(res.payload);
      setLoader(false);
      setWorkTypes(res.payload);
    });
  }, []);

  const formatDuration = (durationMinutes) => {
    if (!durationMinutes || durationMinutes <= 0) return "0m";

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const totalLoggedMinutes = list.reduce(
    (total, entry) => total + (Number(entry.durationMinutes) || 0),
    0,
  );

  const submit = () => {
    setIsLoading(true);
    const obj = {
      workDate: date,
      expectedVersion: header?.versionNo,
    };
    console.log(obj);
    dispatch(commit(obj)).then((res) => {
      console.log(res);
      if (res.payload.status == "200") {
        fetchList({});
      }
      setIsLoading(false);
    });
  };

  const handleWorkItem = (val) => {
    setSelectWorkId(val.workItemId);
    setOpenCreate(true);
  };

  useEffect(() => {
    if (!openCreate) {
      setSelectWorkId(null);
      setSelectEntries(null);
    }
  }, [openCreate]);

  const handleEntries = (item) => {
    setOpenCreate(true);
    setSelectEntries(item);
  };

  return (
    <Box className="entriesContainer">
      <Box className="entriesList">
        <Box className="entriesHeader">
          <Box>
            <Typography variant="h4" color={theme.palette.text.primary}>
              Today’s entries
            </Typography>
            <Typography variant="body2">{`${list.length} entries · ${totalLoggedMinutes} minutes logged`}</Typography>
          </Box>
          {header.status == "DRAFT" && (
            <ModalButton
              open={openCreate}
              setOpen={setOpenCreate}
              label={"Add Time"}
              heading={"Add time entry"}
              type={"button"}
              startIcon={<IoMdAdd />}
              width={"40%"}
            >
              <AddTime
                date={date}
                setOpen={setOpenCreate}
                fetchList={fetchList}
                selectWorkId={selectWorkId}
                selectEntries={selectEntries}
              />
            </ModalButton>
          )}
        </Box>
          <Box className="entriesBody">
          {dataList.map((val) => (
            <Box className="entriesItem">
              <Box className="icon">
                <LuTimer color="#5c55e7" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "500", color: theme.palette.text.primary }}
                >
                  {val?.activityTypeName}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {val?.description}
                </Typography>
                <Typography sx={{ fontSize: "10px" }}>
                  {val?.workItemTitle}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: "12px", fontWeight: "500", color: theme.palette.text.primary }}
              >
                {formatDuration(val?.durationMinutes)}
              </Typography>
              {header.status == "DRAFT" && (
                <LuEllipsis
                  className="entryMenuIcon"
                  onClick={() => handleEntries(val)}
                />
              )}
            </Box>
          ))}
        </Box>
        {header.status == "DRAFT" && (
          <Box className="entriesFooter">
            <Box>
              <Typography
                sx={{ fontSize: "12px", fontWeight: "500", color:  theme.palette.text.primary  }}
              >
                Ready when you are
              </Typography>
              <Typography sx={{ fontSize: "8px" }}>
                Short days are allowed — commit the actual time worked.
              </Typography>
            </Box>
            <Button
              size="medium"
              variant="contained"
              className="commitButton"
              disabled={isLoading}
              startIcon={<LuCircleCheck />}
              onClick={submit}
            >
              {isLoading && (
                <CircularProgress
                  size={20}
                  sx={{ marginRight: 1, color: "inherit" }}
                />
              )}
              Commit day
            </Button>
          </Box>
        )}
      </Box>
      <Box className="suggestedWorkPanel">
        <Box
          className="entriesHeader"
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h4" color={theme.palette.text.primary}>
            Suggested work
          </Typography>
          <Typography variant="body2" sx={{
            color:theme.palette.text.primary
          }}>{`Tickets currently assigned to you.`}</Typography>
        </Box>
        {loader ? (
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
          <Box className="suggestedWorkList">
            {workTypes.map((val) => (
              <Box onClick={() => handleWorkItem(val)} className="workTypeItem">
                <LuBriefcaseBusiness color={theme.palette.text.secondary} />
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "500", color: theme.palette.text.primary}}
                  >
                    {val?.title}
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    {val?.workItemNo}
                  </Typography>
                </Box>
                {header.status == "DRAFT" && <IoMdAdd color={theme.palette.text.primary}/>}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default DataGrid;
