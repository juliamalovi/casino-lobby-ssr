import React from 'react';
import { Box, Paper, Typography } from '@mui/material'

const CasinoError = ({ message }: { message: string }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error" gutterBottom>
                    Error
                </Typography>
                <Typography variant="body1">
                    {message}
                </Typography>
            </Paper>
        </Box>
    )
}

export default CasinoError