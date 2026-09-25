import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { tickets, totalcount } = useSelector(state => state.tickets)

    useEffect(() => {
        console.log(tickets)
        let arr = []
        tickets.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            arr.push(obj)
        })
        setDataList(arr)
    }, [tickets])

    const tableHeader = [
        'Ticket No',
        'Subject',
        'Client',
        'Classification',
        'State',
        'Team',
        'Acknowledgement Status',
        'Created At',
    ]

    const verifyParam = [
        'ticketNo',
        'title',
        'clientName',
        'workTypeCode',
        'stateName',
        'teamName',
        'acknowledgementStatus',
        'createdAtValue',
    ]

    return <>
        <TabelContainer
            tableHeader={tableHeader}
            // action={TableAction}
            data={dataList}
            verifyParam={verifyParam}
            isLoading={isLoading}
            count={totalcount}
            fetchList={fetchList}
        />
    </>
}
export default DataGrid;

