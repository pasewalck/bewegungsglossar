import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WikiIcon from '../assets/icons/wiki-icon.png';
import CalendarIcon from '../assets/icons/calendar-icon.png';

const DesktopHeader = () => (
    <Box>
        <Box sx={{
            height: '70px',
            pl: 3,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
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
                    style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                />
                <Typography variant="h5" sx={{ ml: 2, color: 'white' }}>MovementWiki</Typography>
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', pr: 3 }}>
                <Button
                    color="inherit"
                    href="https://wiki.aktivismus.org/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mr: 2,
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <img
                        src={WikiIcon}
                        alt="Wiki Icon"
                        style={{ marginRight: '8px', height: '20px', width: '20px', filter: 'invert(1)' }}
                    />
                    Movement Wiki
                </Button>
                <Button
                    color="inherit"
                    href="https://kalender.aktivismus.org/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        }
                    }}
                >
                    <img
                        src={CalendarIcon}
                        alt="Calendar Icon"
                        style={{ marginRight: '8px', height: '20px', width: '20px', filter: 'invert(1)' }}
                    />
                    Kalender
                </Button>
            </Box>
        </Box>

        <Box sx={{
            height: '150px',
            p: 2,
            pb: 4,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="h2" align="center" sx={{ m: 1, userSelect: 'none' }}>Bewegungsglossar</Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4, userSelect: 'none', width: 500 }}>
                Lorem ipsum lalala naja vllt ne Beschreibung die auch ganz nett wäre aber die gibt es halt noch net :/
            </Typography>
        </Box>
    </Box>
);

export default DesktopHeader;
