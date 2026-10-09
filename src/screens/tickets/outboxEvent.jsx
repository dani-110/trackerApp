import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ticketOutboxEvents } from "../../store/actions/tickets";

import TabelContainer from '../../components/table/table';
import moment from "moment";

const OutboxEvent = ({ data }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([])


  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    console.log(data)
    dispatch(ticketOutboxEvents(data?.workItemId)).then((res) => {
      if (res.payload.status == 200) {
        let arr = []
        res.payload.data.items?.forEach(ele => {
          const obj = { ...ele }
          obj['occurredAtValue'] = ele.occurredAt ? moment(ele.occurredAt).format('DD MMM YYYY') : ''
          obj['processedAtValue'] = ele.processedAt ? moment(ele.processedAt).format('DD MMM YYYY') : ''
          arr.push(obj)
        });
        setDataList(arr)
      }
      setIsLoading(false);
    });
  };

  const tableHeader = [
    'Event Id',
    'Event Type',
    'Status',
    'Created At',
    'Processed At',
  ]

  const verifyParam = [
    'outboxEventId',
    'eventType',
    'status',
    'occurredAtValue',
    'processedAtValue',
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
export default OutboxEvent;
