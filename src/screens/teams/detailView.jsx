import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { teamsMember } from "../../store/actions/teams";
import Card from "../../components/card/Card";
import Status from "../../components/status/status";
import ModalButton from "../../components/modalButton/modalButton";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import MemberGrid from "./memberGrid";
import AddMemberForm from "./addMemberForm";
import { roleFiller, userFiller } from "../../store/actions/fillers";

const DetailView = () => {
    const theme = useTheme()
    const dispatch = useDispatch();

    const [openCreate, setOpenCreate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataList, setDataList] = useState([])

    const [isLoader, setIsLoader] = useState(false);

    const location = useLocation()
    const { state } = location

    useEffect(() => {
        fetchFilterData()
    }, [])

    const fetchFilterData = async () => {
        setIsLoader(true)
        try {
            await Promise.all([
                dispatch(userFiller({})),
                dispatch(roleFiller({})),
            ]).then(res => {
                fetchList()
                setIsLoader(false)
            });
        } catch (error) {
            console.error("Error loading filters:", error);
        }
    };


    const fetchList = () => {
        dispatch(teamsMember(state.id)).then((res) => {
            if (res.payload.status == 200) {

                setDataList(res.payload.data.items)
            }
            setIsLoading(false)
        });
    };

    return <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '10px', gap: '10px' }}>
        <Card style={{ display: 'flex', flexDirection: 'row', gap: '10px', height: '220px' }}>
            <Box
                sx={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.btnColor.main,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography color={'#fff'} variant="h4">DT</Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
                <Typography variant="h2">{state.name}</Typography>
                <Typography variant="h4">{state.code}</Typography>
                <Typography variant="h4">{state.organizationUnitName}</Typography>
                <Status value={state.status} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                <ModalButton open={openCreate} setOpen={setOpenCreate} label={'Add Member'} heading={'Assign User To Team'} type={'button'} startIcon={<IoMdAdd />} width={'30%'}>
                    <AddMemberForm data={state} setOpen={setOpenCreate} fetchList={fetchList} />
                </ModalButton>
            </Box>

        </Card>
        {isLoader ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                <CircularProgress size={50} />
            </Box>
            :
            <MemberGrid dataList={dataList} isLoading={isLoading} fetchList={fetchList} />
        }
    </Box>
};
export default DetailView;
