import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c7e6e0',
            light: '#faffff',
            dark: '#96b4ae',
        },
        secondary: {
            main: '#FA8423',
            light: '#ffb555',
            dark: 'c15500',
        },
        success: {
            main: '#009A00',
            light: '#00FF02',
        },
        error: {
            main: '#990000',
            light: '#FF0000',
        },
        background: {
            paper: '#171E1C',
            default: '#171E1C',
        },
    },
    spacing: 4,
});
