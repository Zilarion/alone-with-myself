import 'tippy.js/dist/tippy.css';
import './styles.css';

import { configure } from 'mobx';
import * as React from 'react';
import { render } from 'react-dom';

import { App } from './views/App';

configure({ enforceActions: 'observed' });

render(
    <App />,
    document.getElementById('root'),
);
