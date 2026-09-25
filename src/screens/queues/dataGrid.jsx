import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { queues, totalcount } = useSelector(state => state.queues)

    useEffect(() => {
        console.log(queues)
        let arr = []
        queues.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            arr.push(obj)
        })
        setDataList(arr)
    }, [queues])

    const tableHeader = [
        'Queue Name',
        'Code',
        'Sequence',
        'Queue Type',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'name',
        'code',
        'sequenceNo',
        'queueType',
        'status',
        'createdAtValue',
    ]

    return <>
        <TabelContainer
            tableHeader={tableHeader}
            // action={TableAction}
            data={dataList}
            verifyParam={verifyParam}
            isLoading={isLoading}
            fetchList={fetchList}
        />
    </>
}
export default DataGrid;

