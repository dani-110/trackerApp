// import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';
// import { useTheme } from '@emotion/react';
// import './table.scss'
// import TablePaginationComp from './tablePagination';
// import { MdOutlineVerifiedUser } from "react-icons/md";
// import { downloadExcel } from '../../utils/Utils';

// import excelExport from '../../assests/excel_export.png'
// import { useState } from 'react';
// import ProcessingDuration from '../processingDuration/processingDuration';
// import Status from '../status/status';

// const TableContainer = (props) => {
//   const { tableHeader, action: Action, extraColumnFeilds, extraColumn: ExtraColumn, extraColumnParams, addtionalRow: AddRow, data, verifyParam, isLoading, actionText, count, pageNumber, recordCount, fetchList, masterHeader } = props;
//   const theme = useTheme()

//   const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });
//   const filteredData = data?.map((item, index) => {
//     const newObj = {
//       'S. No.': (pagination.page * pagination.rowsPerPage) + index + 1,
//     };

//     verifyParam?.forEach((key, i) => {
//       newObj[tableHeader[i]] = item[key] || '';
//     });

//     return newObj;
//   });


//   return (
//     <>
//       <Box sx={{ flex: 1, overflowX: 'auto', borderRadius: '10px', border: '1px solid #f3f3f3' }}>
//         <Box className='mainTableContainer'>
//           <Table size="small" sx={{ margin: '10px', background:'#faf9f7' }}>
//             <TableHead className='tableHeader'>
//               {masterHeader && <TableRow>
//                 {
//                   masterHeader?.map(e => (
//                     <TableCell align="center" className='tableCell' colSpan={e.colSpan}>
//                       {e.label}
//                     </TableCell>
//                   ))
//                 }

//               </TableRow>}
//               <TableRow>
//                 <TableCell align='center' className='tableCell'>S.NO</TableCell>
//                 {
//                   tableHeader.map((e, i) => (
//                     <TableCell key={i} align='center' className='tableCell'>{e}</TableCell>
//                   ))
//                 }
//                 {
//                   extraColumnFeilds && extraColumnFeilds.map((e, i) => (
//                     <TableCell align='center' className='tableCell'>{e}</TableCell>
//                   ))
//                 }
//                 {
//                   Action && <TableCell align='center' className='tableCell' sx={{ minWidth: '100px' }}>
//                     {actionText ? actionText : "Action"}
//                   </TableCell>
//                 }
//               </TableRow>
//             </TableHead>

//             {verifyParam && <TableBody>
//               {AddRow && <AddRow />}
//               {
//                 data?.map((item, index) => {
//                   return (
//                     <TableRow sx={{
//                       transition: "all 0.3s ease-in-out",
//                       cursor: "pointer", // Makes it feel interactive like Gmail
//                       // "&:hover": {
//                       //   boxShadow: `0px 2px 12px ${theme.palette.shadowColor} `,
//                       //   // transform: "scale(1.02)",
//                       // },
//                     }} >
//                       <TableCell align="center">
//                         <Typography variant='body1' sx={{ color: '#6f6e6e', }}>
//                           {(pagination.page * pagination.rowsPerPage) + index + 1}
//                         </Typography>
//                       </TableCell>
//                       {
//                         verifyParam?.map((v, i) => (
//                           <TableCell align="center">
//                             {v === 'processingduration' ? <ProcessingDuration value={item[v]} /> :
//                                     item[v] === 'Yes' ? <MdOutlineVerifiedUser size={30} color='rgb(19, 222, 185)' /> :
//                                       <>
//                                         {
//                                           <Tooltip title={item[v]}>
//                                             <Typography variant='body1' sx={{
//                                               color: '#6f6e6e',
//                                               display: '-webkit-box',
//                                               overflow: 'hidden',
//                                               textOverflow: 'ellipsis',
//                                               WebkitLineClamp: 2,
//                                               WebkitBoxOrient: 'vertical',
//                                               whiteSpace: 'normal',
//                                             }}>{item[v]}</Typography>
//                                           </Tooltip>
//                                         }
//                                       </>
//                             }
//                           </TableCell>
//                         )
//                         )
//                       }
//                       {
//                         extraColumnParams &&
//                         extraColumnParams.map((v, index) => (
//                           <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
//                             {ExtraColumn(extraColumnParams.length === 1 ? item : item[v])}
//                           </TableCell>
//                         ))
//                       }
//                       {
//                         Action && <TableCell align="center" sx={{ whiteSpace: 'nowrap', minWidth: '100px' }}>
//                           <Action id={item} />
//                         </TableCell>
//                       }
//                     </TableRow>
//                   )
//                 })
//               }
//             </TableBody>}

//           </Table>
//           {
//             isLoading &&
//             <Box className='tableLoadingContainer'>
//               <CircularProgress color='secondary' size={50} sx={{ margin: '20px' }} />
//             </Box>
//           }
//         </Box>

//       </Box>
//       {count > 0 &&
//         <Grid container spacing={2}>
//           {/* <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Tooltip title={'Export'}>
//               <IconButton onClick={() => downloadExcel(filteredData)} sx={{ width: '100px', margin: '0px auto' }}>
//                 <img src={excelExport} style={{ width: '25px', height: '25px', objectFit: 'contain' }} alt='export'/>
//                 <Typography variant='body1' sx={{ marginLeft: '10px' }}>Export</Typography>
//               </IconButton>
//             </Tooltip>
//           </Grid> */}
//           <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
//             <TablePaginationComp count={count} pageNumber={pageNumber} recordCount={recordCount} fetchList={fetchList} onPaginationChange={setPagination} />
//           </Grid>
//         </Grid>
//       }
//     </>
//   );
// }

// export default TableContainer;


import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, CircularProgress, Grid, Tooltip, TableContainer as MuiTableContainer } from '@mui/material';
import { useTheme } from '@emotion/react';
import './table.scss';
import TablePaginationComp from './tablePagination';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from 'react';
import ProcessingDuration from '../processingDuration/processingDuration';
import Status from '../status/status';
import WorkTypeCode from '../workTypeCode/workTypeCode';
import AcknowledgeStatus from '../acknowledgeStatus/acknowledgeStatus';

const TableContainer = (props) => {
  const {
    tableHeader,
    action: Action,
    extraColumnFeilds,
    extraColumn: ExtraColumn,
    extraColumnParams,
    addtionalRow: AddRow,
    data,
    verifyParam,
    isLoading,
    actionText,
    count,
    pageNumber,
    recordCount,
    fetchList,
    masterHeader
  } = props;

  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });
  const theme = useTheme()

  return (
    <Box
      className='mainTableWrapper'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        // background:'#faf9f7'
      }}
    >
      <MuiTableContainer
        sx={{
          flex: 1,
          maxHeight: '100%',
          overflowY: 'auto',
          overflowX: 'auto',
          // border: '1px solid #f3f3f3',
          position: 'relative',
        }}
      >
        <Table stickyHeader size="medium" sx={{ margin: 0, background: theme.palette.backgroundColor, minWidth: '100%' }}>
          <TableHead className='tableHeader'>
            {masterHeader && (
              <TableRow>
                {masterHeader?.map((e, idx) => (
                  <TableCell key={idx} align="center" className='tableCell' colSpan={e.colSpan} sx={{ background: theme.palette.backgroundColor, fontWeight: 'bold', color: '#6c757d' }}>
                    {e.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
            <TableRow>
              <TableCell align='center' className='tableCell' sx={{ background: theme.palette.backgroundColor, fontWeight: 'bold', whiteSpace: 'nowrap', color: '#6c757d' }}>S.NO</TableCell>
              {tableHeader.map((e, i) => (
                <TableCell key={i} align='left' className='tableCell' sx={{ background: theme.palette.backgroundColor, fontWeight: 'bold', whiteSpace: 'nowrap', color: '#6c757d' }}>
                  {e}
                </TableCell>
              ))}
              {extraColumnFeilds && extraColumnFeilds.map((e, i) => (
                <TableCell key={i} align='left' className='tableCell' sx={{ background: theme.palette.backgroundColor, fontWeight: 'bold', whiteSpace: 'nowrap', color: '#6c757d' }}>
                  {e}
                </TableCell>
              ))}
              {Action && (
                <TableCell align='center' className='tableCell' sx={{ minWidth: '100px', background: theme.palette.backgroundColor, fontWeight: 'bold', whiteSpace: 'nowrap', color: '#6c757d' }}>
                  {actionText ? actionText : "Action"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {verifyParam && (
            <TableBody>
              {AddRow && <AddRow />}
              {data?.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      }
                    }}
                  >
                    <TableCell align="center">
                      <Typography variant='body1'>
                        {(pagination.page * pagination.rowsPerPage) + index + 1}
                      </Typography>
                    </TableCell>
                    {verifyParam?.map((v, i) => (
                      <TableCell key={i} align="left">
                        {v === 'status' ? (
                          <Status value={item[v]} />
                        ) :
                          v === 'workTypeCode' ? (
                            <WorkTypeCode value={item[v]} />
                          ) :
                          v === 'acknowledgementStatus' ? (
                            <AcknowledgeStatus value={item[v]} />
                          ) :
                            item[v] === 'Yes' ? (
                              <MdOutlineVerifiedUser size={30} color='rgb(19, 222, 185)' />
                            ) : (
                              <Tooltip title={item[v] || ""}>
                                <Typography
                                  variant='body1'
                                  sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    whiteSpace: 'normal',
                                    maxWidth: '250px',
                                    // margin: '0 auto'
                                  }}
                                >
                                  {item[v]}
                                </Typography>
                              </Tooltip>
                            )}
                      </TableCell>
                    ))}
                    {extraColumnParams && extraColumnParams.map((v, idx) => (
                      <TableCell key={idx} align="left" sx={{ whiteSpace: 'nowrap' }}>
                        {ExtraColumn(extraColumnParams.length === 1 ? item : item[v])}
                      </TableCell>
                    ))}
                    {Action && (
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap', minWidth: '100px' }}>
                        <Action id={item} fetchList={fetchList} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>

        {isLoading && (
          <Box className='tableLoadingContainer' sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress color='secondary' size={40} />
          </Box>
        )}
      </MuiTableContainer>
      {count > 0 && (
        <Box sx={{ flexShrink: 0, pt: 1, pb: 1, background: theme.palette.backgroundColor }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <TablePaginationComp
                count={count}
                pageNumber={pageNumber}
                recordCount={recordCount}
                fetchList={fetchList}
                onPaginationChange={setPagination}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TableContainer;