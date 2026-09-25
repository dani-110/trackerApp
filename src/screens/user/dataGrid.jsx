import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ModalButton from '../../components/modalButton/modalButton';
import moment from 'moment';
import CustomPopover from '../../components/customPopover/customPopover';
import UserEditForm from './userEditForm';
import UserStatusForm from './userStatusForm';
import UserRoleForm from './userRoleForm';
import { getRoleUsers, revokeRoleUsers } from '../../store/actions/users';
import { uiActions } from '../../store/reducers/ui-slice';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])

    const { users, totalcount } = useSelector(state => state.users)

    useEffect(() => {
        console.log(users)
        let arr = []
        users.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            arr.push(obj)
        })
        setDataList(arr)
    }, [users])

    const tableHeader = [
        'Name',
        'Username',
        'Email',
        'Status',
        'Created At',
    ]

    const verifyParam = [
        'displayName',
        'username',
        'email',
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
            count={totalcount}
            fetchList={fetchList}
        />
    </>
}
export default DataGrid;


const TableAction = (data) => {
    const item = data.id
    const [openView, setOpenView] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [heading, setHeading] = useState('');
    const dispatch = useDispatch();

    const revoke = async () => {
        await dispatch(getRoleUsers(item.id)).then((res) => {
            if (res.payload.status == 200) {
                console.log(res.payload)
                if (res.payload?.data?.items?.length == 0) {
                    dispatch(uiActions.showNotification({
                        status: "error",
                        title: "Failed!",
                        message: "Please Assigned Role First!",
                    }))
                    return
                }
                const saveData = {
                    userId: item.id,
                    roleId: res.payload?.data?.items?.[0]?.roleId
                }
                dispatch(revokeRoleUsers(saveData)).then((res) => {
                    console.log(res)
                    if (res.payload.status == '204') {
                        data.fetchList({})
                    }
                });
            }
        });


    }
    const popoverOptions = [
        {
            label: "Edit User",
            onClick: () => {
                setModalContent(<UserEditForm data={item} setOpen={setOpenView} fetchList={data.fetchList} />);
                setHeading('Edit User')
                setOpenView(true);
            }
        },
        {
            label: "Change User Status",
            onClick: () => {
                setModalContent(<UserStatusForm data={item} setOpen={setOpenView} fetchList={data.fetchList} />);
                setHeading('Change User Status')
                setOpenView(true);
            }
        },
        {
            label: "Assign Role To User",
            onClick: () => {
                setModalContent(<UserRoleForm data={item} setOpen={setOpenView} fetchList={data.fetchList} />);
                setHeading('Assign Role To User')
                setOpenView(true);
            }
        },
        {
            label: "Revoke Role Confirmation",
            onClick: () => {
                revoke()
            }
        },
    ];
    return (
        <Box>
            <CustomPopover
                title="Actions"
                options={popoverOptions}
            />

            <ModalButton open={openView} setOpen={setOpenView} heading={heading} width={'30%'}>
                {modalContent}
            </ModalButton>
        </Box>
    )
}