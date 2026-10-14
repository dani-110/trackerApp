import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme } from '@mui/material';
import { ArrowRight } from 'lucide-react';

const DataGrid = (props) => {
    const { isLoading, fetchList, search = '' } = props
    const navigate = useNavigate()
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

    const normalizedSearch = search.trim().toLocaleLowerCase();
    const visibleData = normalizedSearch
        ? dataList.filter((ticket) => [
            ticket.ticketNo,
            ticket.title,
            ticket.clientName,
            ticket.teamName,
            ticket.workTypeCode,
            ticket.stateName,
            ticket.acknowledgementStatus,
        ].some((value) => String(value || '').toLocaleLowerCase().includes(normalizedSearch)))
        : dataList;

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
            data={visibleData}
            verifyParam={verifyParam}
            isLoading={isLoading}
            count={normalizedSearch ? visibleData.length : totalcount}
            fetchList={fetchList}
            onRowClick={(ticket) => navigate('Details', { state: ticket })}
        />
    </>
}
export default DataGrid;


const TableAction = (data) => {
    const item = data.id
    const theme=useTheme();
    const navigate = useNavigate()
   
    return (
        <Box>
           <IconButton onClick={() => navigate(`Details`, { state: item })} size="small">
                <ArrowRight size={17} color={theme.palette.textColor} />
            </IconButton>
        </Box>
    )
}
