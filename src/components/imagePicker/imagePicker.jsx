import React, { useRef, useState } from "react";
import { Box, Grid, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';
import { useTheme } from "@emotion/react";
import './imagePicker.scss'
import upload from '../../assests/upload.png'
import { IoMdClose } from "react-icons/io";
import ImageViewer from "./imageViewer";

const ImagePicker = (props) => {
    const { fieldName, label, control, rules, setValue, error, value } = props;
    const theme = useTheme()
    const [openModal, setOpenModal] = useState(false)

    const csvRef = useRef();

    const DragOverHandler = (e) => {
        e.preventDefault();
    };

    const DragLeaveHandler = (e) => {
        // e.currentTarget.classList.remove("dragOver");
    };

    const uploadOnDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        getBase64(file, (result) => {
            setValue({ name: file.name, image: result })
        });
    };

    const uploadImage = (e) => {
        const file = e.target.files[0];
        getBase64(file, (result) => {
            setValue({ name: file.name, image: result })
        });
    };

    const selectFile = (e) => {
        csvRef.current.click()
    }

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field }) => {
                return (
                    <Tooltip title={rules?.required ? rules.required : ""}>
                        <Box className='imagePickerContainerView' onClick={()=>{Object.keys(value).length > 0 && setOpenModal(true)}} sx={{ border: `1px solid ${theme.palette.inputBorder}` }}>
                            <Grid container>
                                <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" color={error ? 'red' : ''}>{label}{rules?.required && '*'}</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    {Object.keys(value).length > 0 ?
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} variant="body2">{value.name}</Typography>
                                            <IconButton className='icon' onClick={() => setValue({})} size="small">
                                                <IoMdClose color={theme.palette.textColor} size={12} />
                                            </IconButton>
                                        </Box>
                                        : <div
                                            className="uploadArea"
                                            onClick={selectFile}
                                            onDragOver={DragOverHandler}
                                            onDragLeave={DragLeaveHandler}
                                            onDrop={(e) => uploadOnDrop(e)}
                                        >
                                            <input
                                                type="file"
                                                name="uploadAsset"
                                                id="uploadAsset"
                                                hidden
                                                // value={field.value?field?.value.name:''}
                                                onChange={(e) => uploadImage(e)}
                                                ref={csvRef}
                                            />
                                            <img src={upload} className="uploadImage" alt="upload" />
                                        </div>}
                                </Grid>
                            </Grid>
                        </Box>
                        <ImageViewer open={openModal} setOpen={setOpenModal} img={value.image} />
                        {/* {error && (
                            <Typography variant="body2" color="error" sx={{ margin: '5px' }}>
                                {`* ${error.message}`}
                            </Typography>
                        )} */}
                    </Tooltip>
                );
            }}
        />
    )
};

export default ImagePicker;
