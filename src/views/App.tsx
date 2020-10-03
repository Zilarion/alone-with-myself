import { ThemeProvider } from '@material-ui/core/styles';

import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { System } from '../components/System';
import { theme as muiTheme } from '../muiTheme';
import theme from '../theme';

export function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <StyledThemeProvider theme={theme}>
                <IntlProvider locale={'en-US'}>
                    <System />
                </IntlProvider>
            </StyledThemeProvider>
        </ThemeProvider>
    );
}
