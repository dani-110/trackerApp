import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { MdMoreVert } from 'react-icons/md';
import CustomPopover from '../../components/customPopover/customPopover';
import ModalButton from '../../components/modalButton/modalButton';
import TicketClassifyForm from './ticketClassifyForm';
import TicketAssignForm from './ticketAssignForm';

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
    const navigate = useNavigate()
    const popoverOptions = [
        {
            label: "Details",
            onClick: () => {
                navigate(`Details`, { state: item })
            }
        },
        {
            label: "Ticket Assign",
            onClick: () => {
                setModalContent(<TicketAssignForm data={item} setOpen={setOpenView} fetchList={data.fetchList} />);
                setHeading('Assign Team to Ticket')
                setOpenView(true);
            }
        },
        {
            label: "Classify Ticket",
            onClick: () => {
                setModalContent(<TicketClassifyForm data={item} setOpen={setOpenView} fetchList={data.fetchList} />);
                setHeading('Classify Ticket')
                setOpenView(true);
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