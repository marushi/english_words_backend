import * as React from 'react';
import { ReactNode } from 'react';
import { Container } from '../../../node_modules/@mui/material/index';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Gap } from './Gap';

type Props = {
    header: ReactNode,
    children: ReactNode,
};

export const AppLayout = ({ header, children }: Props) => {
    return (
        <React.StrictMode>
            <Container maxWidth="sm">
                {header}
                <Gap size={16} />
                {children}
            </Container>
        </React.StrictMode >
    );
};