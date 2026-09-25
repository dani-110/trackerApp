import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { permissions, totalcount } = useSelector(state => state.permissions)

    useEffect(() => {
        console.log(permissions)
        let arr = []
        permissions.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            arr.push(obj)
        })
        setDataList(arr)
    }, [permissions])

    const tableHeader = [
        'Name',
        'Domain Code',
        'Code',
        'Risk Level',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'name',
        'domainCode',
        'code',
        'riskLevel',
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

