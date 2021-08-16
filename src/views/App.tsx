import { ThemeProvider as StyledThemeProvider } from '@emotion/react';
import {
    StylesProvider,
    ThemeProvider,
} from '@material-ui/core/styles';
import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';

import { theme } from '../theme';
import { View } from './View';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <StyledThemeProvider theme={theme}>
                    <IntlProvider locale="en-US">
                        <HashRouter>
                            <View />
                        </HashRouter>
                    </IntlProvider>
                </StyledThemeProvider>
            </StylesProvider>
        </ThemeProvider>
    );
};
