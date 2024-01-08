import ReactDOM from 'react-dom/client';
import '../src/index.css';
import { AppLayout } from '../src/components/AppLayout';
import { Divider, Typography } from '@mui/material';
import React from 'react';


const App = () => {
    return (
        <React.StrictMode>
            <AppLayout>
                <div>
                    <Typography variant="h1">Sign In</Typography>
                    <Divider orientation="horizontal" />
                    <a href="http://localhost:53000/authentication/sign_in">Sign In with Google</a>
                </div>
            </AppLayout>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);