import { useEffect, useState } from 'react';
import TabelContainer from '../../components/table/table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Box } from '@mui/material';
import DashboardMetricCard from '../../components/dashboardMetricCard/dashboardMetricCard';

const DataGrid = (props) => {
    const { isLoading, fetchList } = props
    const [dataList, setDataList] = useState([])
    const [committedCount, setCommittedCount] = useState(0)
    const [notStartedCount, setNotStartedCount] = useState(0)
    const [inprogressCount, setInprogressCount] = useState(0)
    const [overdueCount, setOverdueCount] = useState(0)

    const { timesheetCompliance, totalcount } = useSelector(state => state.timesheet)

    const formatDuration = (durationMinutes) => {
        if (!durationMinutes || durationMinutes <= 0) return '0m';

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    };


    const checkSubmissionStatus = (item) => {
        if (!item.committedAt && item.complianceStatus == 'DRAFT') {
            return 'Overdue';
        }

        const date = new Date(item.committedAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if ((hours < 21 || (hours === 21 && minutes === 0)) && item.complianceStatus == 'COMMITTED') {
            return 'On time';
        } else {
            return 'Due 9:00 PM';
        }
    };
    useEffect(() => {
        console.log(timesheetCompliance)
        let arr = []
        timesheetCompliance.forEach((ele) => {
            const obj = { ...ele }
            obj['createdAtValue'] = moment(ele.createdAt).format('DD MMM YYYY')
            obj['duration'] = formatDuration(ele.committedMinutes)
            obj['complianceAt'] = checkSubmissionStatus(ele)
            arr.push(obj)
        })
        setDataList(arr)
    }, [timesheetCompliance])

    useEffect(() => {
        setCommittedCount(dataList.filter(item => item.complianceStatus === 'COMMITTED').length);
        setNotStartedCount(dataList.filter(item => item.complianceStatus === "NOT_STARTED").length);
        setInprogressCount(dataList.filter(item => item.complianceAt === "Due 9:00 PM" && item.complianceStatus === 'DRAFT' ).length);
        setOverdueCount(dataList.filter(item => item.complianceAt === "Overdue").length);
        console.log(dataList, committedCount, notStartedCount, inprogressCount, overdueCount);
    }, [dataList])

    const tableHeader = [
        'Team Member',
        'Username',
        'Time Logged',
        'Timesheet',
        'Comliance',
    ]

    const verifyParam = [
        'displayName',
        'username',
        'duration',
        'timesheetStatus',
        'complianceAt',
    ]

    return <>
        <Box className="complianceMetricGrid">
            <DashboardMetricCard className="complianceMetricCard committedMetric" label="Committed" value={committedCount} description="Timesheets submitted" />
            <DashboardMetricCard className="complianceMetricCard inProgressMetric" label="In progress" value={inprogressCount} description="Before deadline" />
            <DashboardMetricCard className="complianceMetricCard notStartedMetric" label="Not started" value={notStartedCount} description="Before deadline" />
            <DashboardMetricCard className="complianceMetricCard overdueMetric" label="Overdue" value={overdueCount} description="Needs follow-up" />
        </Box>
        <TabelContainer
            tableHeader={tableHeader}
            // action={TableAction}
            data={dataList}
            verifyParam={verifyParam}
            isLoading={isLoading}
            fetchList={fetchList}
            count={totalcount}
        />
    </>
}
export default DataGrid;

