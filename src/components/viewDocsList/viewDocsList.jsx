import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Link, Switch, Tooltip, Typography } from "@mui/material";
import './viewDocsList.scss'
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/reducers/ui-slice";
import ModalButton from "../modalButton/modalButton";
import { getconsumerkycdocs, getmerchantkycdocs } from "../../store/actions/digitalIdentity";
import { downloadFile } from "../../utils/Utils";
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";

const ViewDocsList = (props) => {
    const { object, type } = props
    const theme = useTheme()
    const dispatch = useDispatch();
    const [openView, setOpenView] = React.useState(false);
    const [docsList, setDocsList] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const breadCrumCtxt = useContext(BreadCrumSelectorContext)
    const auditTrace = breadCrumCtxt.breadCrumSelector.join('|') + '|Download'

    useEffect(() => {
        if (type == 'Merchant') {
            getMerchantDocs()
        }
        if (type == 'Consumer') {
            getConsumetDocs()
        }
    }, [])

    const getMerchantDocs = () => {
        setIsLoading(true)
        dispatch(getmerchantkycdocs(object)).then((res) => {
            setDocsList(res.payload?.merchantJourneyCustomList)
            setIsLoading(false)
        });
    }

    const getConsumetDocs = () => {
        setIsLoading(true)
        dispatch(getconsumerkycdocs(object)).then((res) => {
            setDocsList(res.payload?.consumerJourneyCustomList)
            setIsLoading(false)
        });
    }
    return (
        <Box className='documentBox' sx={{ border: '1px solid', borderColor: theme.palette.inputBorder }}>
            {/* <input type="file" onChange={(e) => handleFileChange(e)} /> */}
            {/* <Button size="medium" variant="text" color="primary" sx={{ padding: '-1px' }} >Upload</Button> */}
            <ModalButton open={openView} setOpen={setOpenView} tooltip={'View Docs'} title={'View Docs'} type={'button'} width={'30%'}>
                {
                    docsList && docsList?.map((item, index) =>
                        <Box sx={{ margin: '10px 0px', background: index % 2 ? theme.palette.rowBackground : 'transparent', padding: '10px' }}>
                            <Link onClick={() => downloadFile(user, item?.filename, null, auditTrace)}>{item.filename}</Link>
                        </Box>
                    )
                }
            </ModalButton >
        </Box>
    )
};

export default ViewDocsList;
