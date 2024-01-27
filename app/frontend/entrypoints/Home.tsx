import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomeProcessing } from '../components/HomeProcessing';

const Home: React.FC = () => {
  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} >
        <HomeProcessing />
      </Box>
      <Box sx={{ position: "absolute", width: "100%", padding: "0", margin: "0" }} >
        {header()}

      </Box>
    </>
  )
}

const header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "16px",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Typography>
        英語リスト
      </Typography>
      <Button
        color='primary'
        href="authentication/sign_in"
      >
        ログイン
      </Button>
    </Box>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
