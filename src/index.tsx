import 'normalize.css';
import 'tippy.js/dist/tippy.css';

import { configure } from 'mobx';
import { render } from 'react-dom';

import { App } from './views/App';

configure({ enforceActions: 'observed' });

render(
    <App />,
    document.getElementById('root'),
);
