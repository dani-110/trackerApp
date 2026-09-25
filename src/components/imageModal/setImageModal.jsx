import React, { useRef, useState } from "react";
import { Box, Button, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Card from "../card/Card";
import UploadImage from '../../assests/uploadImage.png'
import './Upload.scss'
import { toBase64 } from "../../utils/Utils";
import ButtonContainer from "../buttonContainer";

const SetImageModal = (props) => {
    const { title, setOpen, isLoading, setImageName, submitImage } = props

    const [file, setFile] = useState('')

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
        if(setImageName){
            setImageName(e.target.files[0].name)
        }
        setFile(await toBase64(img))
    };

    const uploadImage = async (e) => {
        const img = e.target.files[0];
        if(setImageName){
            setImageName(e.target.files[0].name)
        }
        setFile(await toBase64(img))
    };

    return (
        <Box style={{ height: '100vh', width: '100vw', background: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: '0px', left: '0px', zIndex: '1000', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Box style={style}>
                <Card >
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography variant="h2">{title}</Typography>
                        <IconButton size="large" onClick={() => setOpen(false)}>
                            <IoMdClose color="rgb(94, 53, 177)" size={25} />
                        </IconButton>
                    </Box>
                    <Divider sx={{ margin: '10px' }} />
                    {file ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <img src={file} style={{ height: '50vh', objectFit: 'contain' }} alt="ViewImage" />
                            <ButtonContainer>
                                <Button size="medium" variant="contained" color="secondary" onClick={() => setFile('')} disabled={isLoading} >Change Image</Button>
                                <Button size="medium" variant="contained" color="primary" onClick={() => submitImage(file)} disabled={isLoading} >{isLoading && (
                                    <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                                )}Submit</Button>
                            </ButtonContainer>
                        </Box>
                        : <div
                            className="uploadArea"
                            onClick={(e) => browseFileHandler(e)}
                            onDragOver={DragOverHandler}
                            onDragLeave={DragLeaveHandler}
                            onDrop={(e) => uploadOnDrop(e, 'answer')}
                        >
                            <input
                                type="file"
                                name="uploadAsset"
                                id="uploadAsset"
                                hidden
                                onChange={uploadImage}
                                ref={uploadRef}
                                accept="image/*"
                            />
                            <img src={UploadImage} className="uploadImage" alt="upload" />
                            <Typography textAlign="center" className="heading">
                                drag &amp; drop
                            </Typography>
                            <Typography textAlign="center" className="subHeading">
                                fill file from your computer here
                            </Typography>
                        </div>
                    }
                </Card>
            </Box>
        </Box>
    )
};

export default SetImageModal;
