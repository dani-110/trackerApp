import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@emotion/react';

export default function TablePaginationComp(props) {
    const theme = useTheme()
    const { count, pageNumber, recordCount, fetchList } = props
    const [page, setPage] = React.useState(pageNumber ? pageNumber - 1 : 0);
    const [rowsPerPage, setRowsPerPage] = React.useState(recordCount ? recordCount : 10);

    React.useEffect(() => {
        props.onPaginationChange && props.onPaginationChange({ page, rowsPerPage });
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchList({}, rowsPerPage, newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        fetchList({}, parseInt(event.target.value, 10), 0)
    };

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color='secondary'
            showLastButton
            showFirstButton
            SelectProps={{
                MenuProps: {
                    sx: {
                        '& .MuiPopover-paper': {
                            backgroundColor: theme.palette.backgroundColor,
                        },
                        '& .MuiMenuItem-root': {
                            backgroundColor: theme.palette.backgroundColor,
                        },
                        '& .Mui-disabled': {
                            color: '#fff'
                        }
                    },
                },
            }}
        />
    );
}