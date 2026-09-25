import React, { useState } from "react";
import { Box, Button, CircularProgress, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import './viewDocument.scss'
import { useTheme } from '@emotion/react';
import Card from "../card/Card";
import { IoMdClose } from "react-icons/io";
import ImageView from "../imageModal/imageModal";
import { downloadBase64File } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import { api } from "../../interfaces/api.interface";
import axios from "axios";

const ViewDocument = (props) => {
    const { label, supportDocCustomList } = props;
    const { user } = useSelector(state => state.auth)
    const theme = useTheme()
    const dispatch = useDispatch();

    const imageDownloadHandler = () => {
        if (Object.keys(supportDocCustomList).length > 0) {
            downloadBase64File(supportDocCustomList?.doclocation, supportDocCustomList?.docfilename)
        } else {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Failed!",
                    message: "No Image Found!",
                })
            );
        }
    }

    const downloadFile = async () => {
        // const url = api.filedownload().url
        // const method = api.filedownload().method
        // const requestBody = {
        //     actuser: user.username,
        //     filename: supportDocCustomList?.docfilename,
        //     filemodule: 'Json',
        //     sessionid: user.sessionId,
        // };
        // const response = await axios[method](url, requestBody, {
        //     responseType: 'blob',
        // })
        // const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
        // const downloadUrl = window.URL.createObjectURL(fileBlob);
        // const link = document.createElement('a');
        // link.href = downloadUrl;
        // link.setAttribute('download', requestBody.filename);
        // document.body.appendChild(link);
        // link.click()
    }
    return (
        <Box className='documentBox' sx={{ border: '1px solid', borderColor: theme.palette.inputBorder }}>
            <Typography variant='body1'>{label}</Typography>
            <Button size="medium" variant="text" color="primary" onClick={() => downloadFile()} >Download</Button>
        </Box>
    )
};

export default ViewDocument;
