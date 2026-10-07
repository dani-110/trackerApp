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

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Grid,
  Tooltip,
  TableContainer as MuiTableContainer,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import "./table.scss";
import TablePaginationComp from "./tablePagination";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from "react";
import ProcessingDuration from "../processingDuration/processingDuration";
import Status from "../status/status";
import WorkTypeCode from "../workTypeCode/workTypeCode";
import AcknowledgeStatus from "../acknowledgeStatus/acknowledgeStatus";

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
    masterHeader,
  } = props;

  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });
  const theme = useTheme();

  return (
    <Box
      className="mainTableWrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        maxHeight: "calc(100vh - 345px)",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        // background:'#faf9f7'
      }}
    >
      <MuiTableContainer
        sx={{
          flex: 1,
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "auto",
          // border: '1px solid #f3f3f3',
          position: "relative",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "0 0 14px 14px",
          backgroundColor: theme.palette.tableRowBackground,
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{
            margin: 0,
            background: theme.palette.tableRowBackground,
            minWidth: "100%",
          }}
        >
          <TableHead className="tableHeader">
            {masterHeader && (
              <TableRow>
                {masterHeader?.map((e, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    className="tableCell"
                    colSpan={e.colSpan}
                    sx={{
                      background: theme.palette.tableHeaderBackground,
                      color: theme.palette.tableHeaderText,
                      fontWeight: "bold",
                    }}
                  >
                    {e.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
            <TableRow>
              <TableCell
                align="center"
                className="tableCell"
                sx={{
                  background: theme.palette.tableHeaderBackground,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  color: theme.palette.tableHeaderText,
                  fontSize: 10,
                  letterSpacing: 0.35,
                  textTransform: "uppercase",
                }}
              >
                S.NO
              </TableCell>
              {tableHeader.map((e, i) => (
                <TableCell
                  key={i}
                  align="left"
                  className="tableCell"
                  sx={{
                    background: theme.palette.tableHeaderBackground,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    color: theme.palette.tableHeaderText,
                    fontSize: 10,
                    letterSpacing: 0.35,
                    textTransform: "uppercase",
                  }}
                >
                  {e}
                </TableCell>
              ))}
              {extraColumnFeilds &&
                extraColumnFeilds.map((e, i) => (
                  <TableCell
                    key={i}
                    align="left"
                    className="tableCell"
                    sx={{
                      background: theme.palette.tableHeaderBackground,
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      color: theme.palette.tableHeaderText,
                      fontSize: 10,
                      letterSpacing: 0.35,
                      textTransform: "uppercase",
                    }}
                  >
                    {e}
                  </TableCell>
                ))}
              {Action && (
                <TableCell
                  align="center"
                  className="tableCell"
                  sx={{
                    minWidth: "100px",
                    background: theme.palette.tableHeaderBackground,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    color: theme.palette.tableText,
                    fontSize: 10,
                    letterSpacing: 0.35,
                    textTransform: "uppercase",
                  }}
                >
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
                      "&:hover": {
                        backgroundColor: theme.palette.tableRowHover,
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        borderColor: theme.palette.divider,
                        py: 1.35,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.tableText }}
                      >
                        {pagination.page * pagination.rowsPerPage + index + 1}
                      </Typography>
                    </TableCell>
                    {verifyParam?.map((v, i) => (
                      <TableCell
                        key={i}
                        align="left"
                        sx={{
                          borderColor: theme.palette.divider,
                          py: 1.35,
                        }}
                      >
                        {v === "displayName" ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.25,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "#e6e9ff",
                                color: "#5b55d9",
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            >
                              {(item[v] || "?")
                                .trim()
                                .slice(0, 2)
                                .toUpperCase()}
                            </Avatar>
                            <Typography
                              variant="body1"
                              sx={{
                                color: theme.palette.tableText,
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {item[v]}
                            </Typography>
                          </Box>
                        ) : v === "status" ? (
                          <Status value={item[v]} />
                        ) : v === "isActive" ? (
                          <Status value={item[v] ? "Active" : "Inactive"} />
                        ) : v === "workTypeCode" ? (
                          <WorkTypeCode value={item[v]} />
                        ) : v === "acknowledgementStatus" ? (
                          <AcknowledgeStatus value={item[v]} />
                        ) : item[v] === "Yes" ? (
                          <MdOutlineVerifiedUser
                            size={30}
                            color="rgb(19, 222, 185)"
                          />
                        ) : (
                          <Tooltip title={item[v] || ""}>
                            <Typography
                              variant="body1"
                              sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                whiteSpace: "normal",
                                maxWidth: "250px",
                                color: theme.palette.tableText,
                                fontSize: 12,
                                // margin: '0 auto'
                              }}
                            >
                              {item[v]}
                            </Typography>
                          </Tooltip>
                        )}
                      </TableCell>
                    ))}
                    {extraColumnParams &&
                      extraColumnParams.map((v, idx) => (
                        <TableCell
                          key={idx}
                          align="left"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {ExtraColumn(
                            extraColumnParams.length === 1 ? item : item[v],
                          )}
                        </TableCell>
                      ))}
                    {Action && (
                      <TableCell
                        align="center"
                        sx={{ whiteSpace: "nowrap", minWidth: "100px" }}
                      >
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
          <Box
            className="tableLoadingContainer"
            sx={{ display: "flex", justifyContent: "center", p: 2 }}
          >
            <CircularProgress color="secondary" size={40} />
          </Box>
        )}
      </MuiTableContainer>
      {count > 0 && (
        <Box
          sx={{
            flexShrink: 0,
            pt: 1,
            pb: 1,
            background: theme.palette.paginationBackground,
            color: theme.palette.tableMutedText,
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 0,
            borderRadius: "0 0 14px 14px",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
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
