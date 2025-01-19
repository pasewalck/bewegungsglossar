import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Popover, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import WikiIcon from '../assets/icons/wiki-icon.png';
import CalendarIcon from '../assets/icons/calendar-icon.png';

const MobileHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenPanel = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePanel = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Box sx={{
                height: '60px',
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                px: 2,
            }}>
                <Button
                    component="a"
                    href="https://aktivismus.org"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'none',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    <img
                        src="https://wiki.aktivismus.org/uploads/images/system/2025-01/ADAFfZfZxlqEIjUz-b1gszpl3weynbzov-36b973bd-9f24-4286-a26d-fe01a10d7f94.jpeg"
                        alt="logo"
                        style={{ height: '40px', width: '40px', objectFit: 'cover' }}
                    />
                    <Typography variant="h6" sx={{ ml: 1, color: 'white' }}>MovementWiki</Typography>
                </Button>

                <Typography variant="h6" sx={{
                    userSelect: 'none',
                    color: 'white',
                    flexGrow: 1,
                    textAlign: 'right',
                    mr: 2
                }}>
                    Bewegungsglossar
                </Typography>

                <IconButton
                    color="inherit"
                    onClick={handleOpenPanel}
                >
                    <AppsIcon />
                </IconButton>
            </Box>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePanel}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItem button component="a" href="https://wiki.aktivismus.org/">
                        <ListItemIcon>
                            <img
                                src={WikiIcon}
                                alt="Wiki Icon"
                                style={{ height: '24px', width: '24px', filter: 'grayscale(100%)' }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Movement Wiki"
                            slotProps={{
                                primary: { sx: { color: 'black' } }
                            }}
                        />
                    </ListItem>
                    <ListItem button component="a" href="https://kalender.aktivismus.org/">
                        <ListItemIcon>
                            <img
                                src={CalendarIcon}
                                alt="Calendar Icon"
                                style={{ height: '24px', width: '24px', filter: 'grayscale(100%)' }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Kalender"
                            slotProps={{
                                primary: { sx: { color: 'black' } }
                            }}
                        />
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
};

export default MobileHeader;