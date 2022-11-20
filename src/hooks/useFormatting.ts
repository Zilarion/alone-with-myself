import { useContext } from 'solid-js';

import { IntlContext } from '../pages/IntlProvider';
import { assertDefined } from '../util/assertDefined';

export function useFormatting() {
    return assertDefined(
        useContext(IntlContext)
    );
}
