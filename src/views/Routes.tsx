import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { ActionPanel } from '../components/ActionPanel';
import { FloatingSidebar } from '../components/FloatingSidebar';
import { InformationPanel } from '../components/InformationPanel';
import { System } from '../components/System';
import { Game } from '../models';

interface RoutesProps {
    game: Game;
}

export const Routes = observer(({ game }: RoutesProps) => {
    const selected = game.selectedEntity;
    return <Switch>
        <Route path="/scanner">
            <FloatingSidebar side={'left'}>
                {selected && <InformationPanel entity={selected} />}
            </FloatingSidebar>
            <System game={game} />
        </Route>
        <Route path="/technology">
            Tech placeholder
        </Route>
        <Route path="/">
            <FloatingSidebar side={'left'}>
                {selected && <ActionPanel entity={selected} />}
            </FloatingSidebar>
            <System game={game} />
        </Route>
    </Switch>;
});
