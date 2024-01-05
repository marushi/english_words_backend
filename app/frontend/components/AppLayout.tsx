import { Container } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

export const AppLayout = ({ children }: Props) => {
    return (
        <React.StrictMode>
            <Container maxWidth="md">
                {children}
            </Container>
        </React.StrictMode >
    );
};