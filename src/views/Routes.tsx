import { observer } from 'mobx-react-lite';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { ActionPanel } from '../components/ActionPanel';
import { FloatingSidebar } from '../components/FloatingSidebar';
import { InformationPanel } from '../components/InformationPanel';
import { System } from '../components/System';
import { TradePanel } from '../components/TradePanel';
import { useGame } from '../hooks/useGame';

export const Routes = observer(() => {
    const { selectedEntity: selected } = useGame();

    return <Switch>
        <Route path="/scanner">
            <FloatingSidebar side={'left'}>
                {selected && <InformationPanel entity={selected} />}
            </FloatingSidebar>
            <System />
        </Route>

        <Route path="/trade">
            <FloatingSidebar side={'left'}>
                {selected && <TradePanel entity={selected} />}
            </FloatingSidebar>
            <System />
        </Route>

        <Route path="/technology">
            Tech placeholder
        </Route>

        <Route path="/">
            <FloatingSidebar side={'left'}>
                {selected && <ActionPanel entity={selected} />}
            </FloatingSidebar>
            <System />
        </Route>
    </Switch>;
});
