// eslint-disable-next-line no-restricted-imports
import { Link } from 'react-router-dom';

export interface Linkable {
    component?: typeof Link;
    to?: string;
}
