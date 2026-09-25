import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { organizationUnits, totalcount } = useSelector(state => state.organizationUnits)

    useEffect(() => {
        console.log(organizationUnits)
        let arr = []
        organizationUnits.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            obj['parentUnit'] = organizationUnits?.find(val => val?.id == ele?.parentId)?.name || ''
            arr.push(obj)
        })
        setDataList(arr)
    }, [organizationUnits])

    const tableHeader = [
        'Name',
        'Code',
        'Unit Type',
        'Parent Unit',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'name',
        'code',
        'unitType',
        'parentUnit',
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

