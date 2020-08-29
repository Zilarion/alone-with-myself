
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { System } from '../components/System';
import theme from '../theme';

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <System />
        </ThemeProvider>
    );
}
