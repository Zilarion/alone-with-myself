import 'normalize.css';
import 'tippy.js/dist/tippy.css';

import { configure } from 'mobx';
import { render } from 'react-dom';

import { App } from './pages/App';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
});

render(
    <App />,
    document.getElementById('root'),
);
