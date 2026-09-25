import React, { useEffect, useRef } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { LuUpload } from "react-icons/lu";


const UploadSingleFile = (props) => {
    const { title, setImage, file, fileName, setFileName } = props
    const uploadRef = useRef();
    useEffect(() => {
        if (file == '') {
            uploadRef.current.value = "";
        }
    }, [file])

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
        setImage(img)
    };

    const uploadImage = async (e) => {
        const img = e.target.files[0];
        if (setFileName) {
            setFileName(e.target.files[0]?.name)
        }
        if (img) {
            setImage(img)
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
                    accept=".txt,.xlsx"
                />
                {file ? <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px', alignItems: 'center' }}>
                    <Typography variant="body1" color="#155dfc" >{fileName}</Typography>
                    <Box onClick={browseFileHandler}>
                        <Tooltip title={'Re-Upload Image'}>
                            <Box>
                                <LuUpload size={'25px'} color={'rgb(29, 125, 228)'} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
                    : <Box onClick={(e) => browseFileHandler(e)}
                        onDragOver={DragOverHandler}
                        onDragLeave={DragLeaveHandler}
                        onDrop={(e) => uploadOnDrop(e, 'answer')} style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>

                        <LuUpload size={'25px'} color={'#99a1af'} />
                        <Typography variant="body1" color="#155dfc" >{title}</Typography>
                    </Box>}
            </Box>

        </>
    )
};

export default UploadSingleFile;
