import React, { useRef, useState } from "react";
import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { toBase64 } from "../../utils/Utils";
import { LuUpload } from "react-icons/lu";


const GetImage = (props) => {
    const { title, setImage, file, setFileName, onFetch, isLoading } = props

    const [viewImage, setViewImage] = useState(false)

    const style = {
        top: '50%',
        left: '50%',
        width: '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const uploadRef = useRef();
    const browseFileHandler = (e) => {
        uploadRef.current.click();
    };
    const DragOverHandler = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("dragOver");
    };
    const DragLeaveHandler = (e) => {
        e.currentTarget.classList.remove("dragOver");
    };

    const uploadOnDrop = async (e, type) => {

        e.preventDefault();
        const img = e.dataTransfer.files[0];
        if (setFileName) {
            setFileName(e.target?.files[0]?.name)
        }
        setViewImage(false)
        setImage(await toBase64(img))
    };

    const uploadImage = async (e) => {
        const img = e.target.files[0];
        if (setFileName) {
            setFileName(e.target.files[0]?.name)
        }
        setViewImage(false)
        if (img) {
            setImage(await toBase64(img))
        }
    };

    const removeFile = () => {
        setImage('')
        setFileName('')
    }
    return (
        <>
            <Box style={{ width: '100%', border: '1px solid rgb(145, 89, 255)', borderRadius: '5px', padding: '10px 0px', }}>

                <input
                    type="file"
                    name="uploadAsset"
                    id="uploadAsset"
                    hidden
                    onChange={uploadImage}
                    ref={uploadRef}
                    accept=".png,.jpg,.jpeg,"
                />
                <Box
                    // onDragOver={DragOverHandler}
                    // onDragLeave={DragLeaveHandler}
                    // onDrop={(e) => uploadOnDrop(e, 'answer')} 
                    style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '0px 10px' }}
                >

                    <Box display={isLoading} onClick={(e) => browseFileHandler(e)} sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <LuUpload size={'25px'} color={'#99a1af'} />
                        <Typography variant="body1" color="#155dfc" >{title}</Typography>
                    </Box>
                    <Button disabled={isLoading || !file} onClick={onFetch} variant="contained" sx={{ gap: '10px' }}>
                        {isLoading && <CircularProgress color='secondary' size={20} />}
                        Upload
                    </Button>
                </Box>
            </Box>

        </>
    )
};

export default GetImage;
