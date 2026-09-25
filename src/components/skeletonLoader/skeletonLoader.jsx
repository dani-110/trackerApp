import React from "react";
import { CircularProgress } from "@mui/material";
import "./skeletonLoader.scss";
import Card from "../card/Card";

const SkeletonLoader = (props) => {
    return <Card className="skeletonMainContainer" style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <CircularProgress size={100} color="secondary"/>
        {/* <Card className="skeletonInsideContainer" >
            <Box className="skeletonSearchBar">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={200} height={30} sx={{ fontSize: '1rem' }} />
                </Box>

            </Box>
            <Box className='childContainer' >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                </Grid>
            </Box>
        </Card>
        <Box sx={{ margin: '10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Skeleton variant="rounded" height={'10%'} />
            <Skeleton variant="rounded" height={'90%'} />
        </Box> */}
    </Card>

};

export default SkeletonLoader;
