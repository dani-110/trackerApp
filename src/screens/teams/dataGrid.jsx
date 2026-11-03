import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import { Box, IconButton, useTheme } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { ArrowRight } from 'lucide-react';
import CustomPopover from '../../components/customPopover/customPopover';
import TeamCreateForm from './teamCreateForm';
import ModalButton from '../../components/modalButton/modalButton';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { teams, totalcount } = useSelector(state => state.teams)

    useEffect(() => {
        console.log(teams)
        let arr = []
        teams.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            arr.push(obj)
        })
        setDataList(arr)
    }, [teams])

    const tableHeader = [
        'Team Name',
        'Code',
        'Organisation Unit',
        'Member',
        'Is Active',
    ]

    const verifyParam = [
        'name',
        'code',
        'organizationUnitName',
        'memberCount',
        'isActive',
    ]

    return <>
        <TabelContainer
            tableHeader={tableHeader}
            action={user?.permissions?.includes('TEAM_MEMBER_VIEW') && TableAction}
            data={dataList}
            verifyParam={verifyParam}
            isLoading={isLoading}
            count={totalcount}
            fetchList={fetchList}
            onRowClick={(team) => navigate('Details', { state: team })}
        />
    </>
}
export default DataGrid;


// const TableAction = (data) => {
//     console.log(data)
//     const item = data.id
//     const theme = useTheme()
//     const navigate = useNavigate()

//     return (
//         <Box>
//             <IconButton onClick={() => navigate(`Details`, { state: item })} size="small">
//                 <ArrowRight size={17} color={theme.palette.textColor} />
//             </IconButton>
//         </Box>
//     )
// }



const TableAction = (data) => {
    const item = data.id;
    const [openView, setOpenView] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [heading, setHeading] = useState("");
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);

    const popoverOptions = [
        {
            label: "Update Team",
            permission: "TEAM_UPDATE",
            onClick: () => {
                setModalContent(
                    <TeamCreateForm
                        data={item}
                        setOpen={setOpenView}
                        fetchList={data.fetchList}
                        type='Update'
                    />,
                );
                setHeading("Update Team");
                setOpenView(true);
            },
        },
        {
            label: "Detail",
            permission: "TEAM_MEMBER_VIEW",
            onClick: () => {
                navigate(`Details`, { state: item })
            },
        },
    ];
    return (
        <Box>
            <CustomPopover
                title="Actions"
                options={popoverOptions.filter((option) => {
                    if (option.visible !== undefined) return option.visible;
                    return user?.permissions?.includes(option.permission);
                })}
            />
            <ModalButton
                open={openView}
                setOpen={setOpenView}
                heading={heading}
                width={"30%"}
            >
                {modalContent}
            </ModalButton>
        </Box>
    );
};

