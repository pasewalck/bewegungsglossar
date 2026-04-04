import { useState, useEffect } from 'react';
import {
    IconButton, Popover, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Box, Typography
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';

const EXCLUDED_SUBDOMAIN = 'glossar.aktivismus.org';
const API_URL = 'https://overview.aktivismus.org/app_list';

const AppLinksDropdown = ({ iconColor = "inherit" }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (anchorEl && entries.length === 0 && !loading && !error) {
            setLoading(true);
            fetch(API_URL)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch');
                    return res.json();
                })
                .then(data => {
                    const allEntries = data.entries || [];
                    const filtered = allEntries.filter(entry => {
                        try {
                            const host = new URL(entry.url).host;
                            return host !== EXCLUDED_SUBDOMAIN;
                        } catch {
                            return false;
                        }
                    });
                    setEntries(filtered);
                })
                .catch(() => setError('Fehler beim Laden der Apps'))
                .finally(() => setLoading(false));
        }
    }, [anchorEl, entries.length, loading, error]);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton color={iconColor} onClick={handleOpen}>
                <AppsIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ minWidth: 250, maxWidth: 350 }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2">Weiteres</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sachen, die wir sonst noch so anbieten :)
                        </Typography>
                    </Box>
                    <List>
                        {loading && (
                            <ListItem>
                                <ListItemIcon>
                                    <CircularProgress size={20} />
                                </ListItemIcon>
                                <ListItemText primary="Lädt..." />
                            </ListItem>
                        )}
                        {error && (
                            <ListItem>
                                <ListItemText primary={error} />
                            </ListItem>
                        )}
                        {!loading && !error && (entries).map(entry => (
                            <ListItem button component="a" href={entry.url} target="_blank" rel="noopener noreferrer" key={entry.url}>
                                <ListItemIcon>
                                    <img src={entry.image} alt={entry.name} style={{ height: 24, width: 24 }} />
                                </ListItemIcon>
                                <ListItemText primary={entry.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Popover>
        </>
    );
};

export default AppLinksDropdown;
