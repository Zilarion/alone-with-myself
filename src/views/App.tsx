import { ThemeProvider as StyledThemeProvider } from '@emotion/react';
import {
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';
import StylesProvider from '@mui/styles/StylesProvider';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { theme } from '../theme';
import { View } from './View';

export const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                    <StyledThemeProvider theme={theme}>
                        <IntlProvider locale="en-US">
                            <BrowserRouter>
                                <View />
                            </BrowserRouter>
                        </IntlProvider>
                    </StyledThemeProvider>
                </StylesProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
