import 'normalize.css';

import { configure } from 'mobx';
import { render } from 'solid-js/web';

import { App } from './pages/App';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
});

render(() => <App />, document.body);
