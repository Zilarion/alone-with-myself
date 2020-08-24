import * as React from 'react';
import { render } from 'react-dom';

import { Game } from './models';
import { System } from './views/System';

const game = new Game();

render(
    <System game={game} />,
    document.getElementById('root'),
);
