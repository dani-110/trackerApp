import { Box } from "@mui/material";
import React from "react";
const ButtonContainer = (props) => {
    const { children, isSingle, alignLeft, alignCenter, isThree, isFour, isFive } = props
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                justifyContent: alignLeft ? 'start' : alignCenter ? 'center' : 'end'
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${isSingle ? 1 : isThree ? 3 : isFour ? 4 : isFive ? 5 : 2}, minmax(100px, 1fr))`,
                    gap: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default ButtonContainer;
