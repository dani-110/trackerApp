import {
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticketAssignmentHistory, tickets } from "../../store/actions/tickets";

import TabelContainer from '../../components/table/table';
import moment from "moment";

const AssignmentHistory = ({ data }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([])


  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    console.log(data)
    dispatch(ticketAssignmentHistory(data?.workItemId)).then((res) => {
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

  const tableHeader = [
    'Assigned At',
    'Team',
    'Reason',
    'Comment',
    'Assigned By',
  ]

  const verifyParam = [
    'assignedAtValue',
    'targetName',
    'assignmentReasonCode',
    'assignmentComment',
    'assignedByDisplayName',
  ]
  return (
    <TabelContainer
      tableHeader={tableHeader}
      // action={TableAction}
      data={dataList}
      verifyParam={verifyParam}
      isLoading={isLoading}
      // count={normalizedSearch ? visibleData.length : totalcount}
      fetchList={fetchList}
    />
  );
};
export default AssignmentHistory;
