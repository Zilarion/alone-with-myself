import { observer } from 'mobx-react-lite';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { ActionPanel } from '../components/ActionPanel';
import { FloatingSidebar } from '../components/FloatingSidebar';
import { InformationPanel } from '../components/InformationPanel';
import { System } from '../components/System';
import { Game } from '../internal';
import styled from '../themed-components';

interface RoutesProps {
    game: Game;
}

const Wrapper = styled.div`
    display: flex;
`;

export const Routes = observer(({ game }: RoutesProps) => {
    const selected = game.selectedEntity;
    return <Switch>
        <Route path="/scanner">
            <Wrapper>
                <FloatingSidebar side={'left'}>
                    {selected && <InformationPanel entity={selected} />}
                </FloatingSidebar>
                <System game={game} />
            </Wrapper>
        </Route>
        <Route path="/technology">
            Tech placeholder
        </Route>
        <Route path="/">
            <Wrapper>
                <FloatingSidebar side={'left'}>
                    {selected && <ActionPanel entity={selected} />}
                </FloatingSidebar>
                <System game={game} />
            </Wrapper>
        </Route>
    </Switch>;
});
