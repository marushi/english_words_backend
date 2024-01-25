
import { MenuItem, IconButton, Box, Menu, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { useAuthentication } from '../hooks/UseAuthentication';

export const MenuPopper: React.FC = () => {
    const { signOut } = useAuthentication()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOut();
    }

    return (
        <Box sx={{ float: "right" }}>
            <IconButton
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem >
                    <Button
                        href="http://localhost:53000/authentication/sign_out"
                        sx={{
                            padding: "0",
                            margin: "0",
                        }}
                    >ログアウト</Button>
                </MenuItem>
            </Menu>
        </Box>
    )
}