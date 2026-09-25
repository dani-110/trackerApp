import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { Box, Button, CircularProgress, IconButton, Typography, useTheme } from '@mui/material';
import { MdMoreVert } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { filterName } from '../../utils/Utils';
import ModalButton from '../../components/modalButton/modalButton';
import { IoRemoveCircleOutline } from "react-icons/io5";
import ButtonContainer from '../../components/buttonContainer';
import { removeTeamsMember } from '../../store/actions/teams';

const MemberGrid = (props) => {
    const { dataList, isLoading, fetchList } = props
    const { rolefiller } = useSelector(state => state.filler)
    const [list, setList] = useState([])


    useEffect(() => {
        let arr = []
        dataList.forEach((ele) => {
            const obj = { ...ele }
            obj['effectiveFromValue'] = moment(ele.effectiveFrom).format('DD MMM YYYY')
            obj['membershipRoleValue'] = filterName(rolefiller, ele.membershipRole) || ele.membershipRole;
            arr.push(obj)
        })
        setList(arr)
    }, [dataList])




    const tableHeader = [
        'Name',
        'Username',
        'Role',
        'Status',
        'Joined At',
    ]

    const verifyParam = [
        'displayName',
        'username',
        'membershipRoleValue',
        'status',
        'effectiveFromValue',
    ]


    return <>

        <TabelContainer
            tableHeader={tableHeader}
            action={TableAction}
            data={list}
            verifyParam={verifyParam}
            isLoading={isLoading}
            fetchList={fetchList}
        />
    </>
}
export default MemberGrid;


const TableAction = (data) => {
    const [removeMember, setRemoveMember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    console.log(data)
    const submit = () => {
        setIsLoading(true)
        const saveData = {
            teamId: data.id.teamId,
            userId: data.id.userId
        }
        console.log(saveData)
        dispatch(removeTeamsMember(saveData)).then((res) => {
            console.log(res)
            if (res.payload.status == '204') {
                setRemoveMember(false)
                data.fetchList({})
            }
            setIsLoading(false)
        });
    }

    return (
        <Box>
            <ModalButton open={removeMember} setOpen={setRemoveMember} heading={'Remove Team Member'} type={'icon'} startIcon={<IoRemoveCircleOutline />} width={'30%'}>
                {/* <AddMemberForm data={state} setOpen={setRemoveMember} fetchList={fetchList} /> */}
                <Box sx={{ margin: '10px' }}>
                    <Typography sx={{ margin: '10px 0px' }}>Are you sure you want to remove this member from team?</Typography>
                    <ButtonContainer alignCenter>
                        <Button variant='contained' color='error' onClick={() => setRemoveMember(false)}>Cancel</Button>
                        <Button variant='contained' onClick={submit} disabled={isLoading}>
                            {isLoading && (
                                <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                            )}Remove</Button>
                    </ButtonContainer>
                </Box>
            </ModalButton>
        </Box>
    )
}