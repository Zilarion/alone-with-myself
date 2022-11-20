import {
    createIntl,
    createIntlCache,
    IntlShape,
} from '@formatjs/intl';
import {
    createContext,
    JSX,
} from 'solid-js';

interface IntlProviderProps {
    locale: string;
    children: JSX.Element;
}

export const IntlContext = createContext<IntlShape | null>(null);

export const IntlProvider = (props: IntlProviderProps) => {
    const cache = createIntlCache();

    const intl = createIntl(
        {
            locale: props.locale,
            messages: {},
        },
        cache
    );

    return <IntlContext.Provider value={intl}>
        {props.children}
    </IntlContext.Provider>;
};
