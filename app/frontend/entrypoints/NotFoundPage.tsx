import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Gap } from '../components/Gap';

export const NotFoundPage: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', mx: 'auto' }}>
            <Typography variant="h3">
                404<br />
                ページが見つかりませんでした<br />
            </Typography>
            <Gap size={16} />
            <Typography variant="h5">
                下記ボタンからトップページへ戻ってください
            </Typography>
            <Gap size={16} />
            <Button variant="contained" color="primary" href="/">
                トップページへ
            </Button>
        </Box>
    )
}