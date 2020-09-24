
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { System } from '../components/System';
import theme from '../theme';

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={'en-US'}>
                <System />
            </IntlProvider>
        </ThemeProvider>
    );
}
