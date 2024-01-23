import React from 'react';
import { Box } from '../../../node_modules/@mui/material/index';

type Props = {
    size: number
};

export const Gap: React.FC<Props> = ({ size }: Props) => {
    return (
        <Box
            height={size}
            width={size}
        />
    );
};