import {
    StylesProvider,
    ThemeProvider,
} from '@material-ui/core/styles';

import { IntlProvider } from 'react-intl';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme as muiTheme } from '../muiTheme';
import theme from '../theme';
import { View } from './View';

export function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <StylesProvider injectFirst>
                <StyledThemeProvider theme={theme}>
                    <IntlProvider locale={'en-US'}>
                        <HashRouter>
                            <View />
                        </HashRouter>
                    </IntlProvider>
                </StyledThemeProvider>
            </StylesProvider>
        </ThemeProvider>
    );
}
