import {
    HopeProvider,
    HopeThemeConfig,
} from '@hope-ui/solid';
import { Router } from '@solidjs/router';

import { IntlProvider } from './IntlProvider';
import { View } from './View';

const config: HopeThemeConfig = { initialColorMode: 'system' };

export const App = () => {
    return (
        <HopeProvider config={config}>
            <IntlProvider locale="en-US">
                <Router>
                    <View />
                </Router>
            </IntlProvider>
        </HopeProvider>
    );
};
