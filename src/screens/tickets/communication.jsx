import {
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ticketActivityHistory } from "../../store/actions/tickets";
import moment from "moment";
import { initials } from "../../utils/Utils";

const Communication = ({ data }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([])


  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    console.log(data)
    dispatch(ticketActivityHistory(data?.workItemId)).then((res) => {
      if (res.payload.status == 200) {
        let arr = []
        res.payload.data.items?.forEach(ele => {
          const obj = { ...ele }
          obj['assignedAtValue'] = moment(ele.assignedAt).format('DD MMM YYYY')
          arr.push(obj)
        });
        setDataList(arr)
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      {
        dataList.map(ele => (
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', flex: 1, margin: '10px 0px' }}>
              <Box sx={{ display: 'flex', height: '30px', width: '30px', justifyContent: 'center', alignItems: 'center', borderRadius: '100px', background: '#172640' }}>
                <Typography variant="h4" sx={{ textTransform: 'capitalize', color: '#fff' }}>{initials(ele.actorUsername)}</Typography>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>{ele.actorUsername}</Typography>
                  <Typography variant="body2">{moment(ele.eventTime).format('DD MMM YYYY hh:mm')}</Typography>
                </Box>
                <Typography variant="body1">{ele.actionCode}</Typography>
                <Typography variant="body2">{ele.reason}</Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))
      }
    </>
  );
};
export default Communication;
