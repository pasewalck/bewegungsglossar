import { Box, Typography, Button } from '@mui/material';
import AppLinksDropdown from './AppLinksDropdown';

const MobileHeader = () => (
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
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
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

            <AppLinksDropdown />
        </Box>
    </Box>
);

export default MobileHeader;
