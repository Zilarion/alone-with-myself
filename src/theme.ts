import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#4CF2F6',
            light: '#ACF9FB',
        },
        success: {
            main: '#009A00',
            light: '#00FF02',
        },
        error: {
            main: '#990000',
            light: '#FF0000',
        },
        background: { default: 'rgba(3, 26, 31, 0.6)' },
        text: {
            primary: '#26dafd',
            disabled: '#666666',
        },
    },
    spacing: 4,
});
