import ReactDOM from 'react-dom/client';
import '../src/index.css';
import { AppLayout } from '../components/AppLayout';
import React from 'react';
import { Typography, Divider } from '@mui/material';


const App = () => {
    return (
        <React.StrictMode>
            <AppLayout
                header={<></>}
                children={
                    <div>
                        <Typography variant="h1">Sign In</Typography>
                        <Divider orientation="horizontal" />
                        <a href="http://localhost:53000/authentication/sign_in">Sign In with Google</a>
                    </div>
                }
            />
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);