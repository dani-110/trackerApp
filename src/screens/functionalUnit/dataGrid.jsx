import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { functionalUnit, totalcount } = useSelector(state => state.functionalUnit)

    useEffect(() => {
        console.log(functionalUnit)
        let arr = []
        functionalUnit.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            arr.push(obj)
        })
        setDataList(arr)
    }, [functionalUnit])

    const tableHeader = [
        'Level Name',
        'Code',
        'Sequence',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'name',
        'code',
        'sequenceNo',
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

