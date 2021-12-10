import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { theme } from '../theme';
import { View } from './View';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <CssBaseline />
                <IntlProvider locale="en-US">
                    <BrowserRouter>
                        <View />
                    </BrowserRouter>
                </IntlProvider>
            </StylesProvider>
        </ThemeProvider>
    );
};
