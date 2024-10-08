import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

const EnduranceBar = ({ title, width, max, current, colorOk = '#4caf50', colorKo = '#ffeb3b', backgroundColor = '#f44336' }) => {

    const healthPercentage = (current / max) * 100;

    return (
        <Box display="flex" alignItems="center">
            <Box width={`${width}px`} mr={1}>
                <LinearProgress
                    variant="determinate"
                    value={healthPercentage}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: backgroundColor,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: healthPercentage > 50 ? colorOk : colorKo,
                        },
                    }}
                />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{title} {current}/{max}</Typography>
            </Box>
        </Box>
    );
};

export default EnduranceBar;