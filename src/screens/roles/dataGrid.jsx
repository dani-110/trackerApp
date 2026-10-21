import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Box } from '@mui/material';
import ModalButton from '../../components/modalButton/modalButton';
import RoleCreateForm from './roleCreateForm';
import { MdEdit } from "react-icons/md";

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { roles, totalcount } = useSelector(state => state.roles)

    useEffect(() => {
        console.log(roles)
        let arr = []
        roles.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['status'] = ele.isActive ? 'Active' : 'Not Active'
            arr.push(obj)
        })
        setDataList(arr)
    }, [roles])

    const tableHeader = [
        'Name',
        'Code',
        'Version',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'name',
        'code',
        'versionNo',
        'status',
        'createdAtValue',
    ]

    return <>
        <TabelContainer
            tableHeader={tableHeader}
            action={TableAction}
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

            <ModalButton open={openView} setOpen={setOpenView} heading={'Update Role'} width={'30%'} type={'icon'} startIcon={<MdEdit />}>
                <RoleCreateForm data={item} setOpen={setOpenView} fetchList={data.fetchList} type={'Update'} />
            </ModalButton>
        </Box>
    )
}
