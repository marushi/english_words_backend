import * as React from 'react';
import { ReactNode } from 'react';
import { Container } from '../../../../node_modules/@mui/material/index';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type Props = { children: ReactNode };

export const AppLayout = ({ children }: Props) => {
    return (
        <React.StrictMode>
            <Container maxWidth="sm">
                {children}
            </Container>
        </React.StrictMode >
    );
};