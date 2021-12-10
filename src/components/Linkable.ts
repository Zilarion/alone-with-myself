import {
    Link,
    NavLink,
} from 'react-router-dom';

export interface Linkable {
    component?: typeof Link | typeof NavLink;
    to?: string;
}
