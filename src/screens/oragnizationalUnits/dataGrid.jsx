import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Box } from '@mui/material';
import PermissionComp from '../../components/permissionComp/permissionComp';
import ModalButton from '../../components/modalButton/modalButton';
import OrgCreateForm from './orgCreateForm';
import { MdEdit } from 'react-icons/md';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])
    const { user } = useSelector((state) => state.auth);

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
        'Code',
        'Name',
        'Type',
        'Status',
    ]

    const verifyParam = [
        'code',
        'name',
        'unitType',
        'status',
    ]

    return <>
        <TabelContainer
            tableHeader={tableHeader}
            action={user?.permissions?.includes("ORG_UNIT_UPDATE") && TableAction}
            data={dataList}
            verifyParam={verifyParam}
            isLoading={isLoading}
            fetchList={fetchList}
        />
    </>
}
export default DataGrid;



const TableAction = (data) => {
    const item = data.id
    const [openView, setOpenView] = useState(false);
    return (
        <Box>
            <PermissionComp name='ORG_UNIT_UPDATE'>
                <ModalButton open={openView} setOpen={setOpenView} heading={'Update Organization'} width={'30%'} type={'icon'} startIcon={<MdEdit />}>
                    <OrgCreateForm data={item} setOpen={setOpenView} fetchList={data.fetchList} type={'Update'} />
                </ModalButton>
            </PermissionComp>
        </Box>
    )
}