import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Game } from '../models';
import { ActionPanel } from './ActionPanel';
import { FloatingSidebar } from './FloatingSidebar';
import { InformationPanel } from './InformationPanel';

interface SidebarProps {
    game: Game;
}

export const Sidebar = observer(({ game: { selectedEntity } }: SidebarProps) => {
    return <>
        {selectedEntity && <FloatingSidebar side={'left'}>
            <InformationPanel entity={selectedEntity} />
        </FloatingSidebar>}

        {selectedEntity && <FloatingSidebar side={'right'}>
            <ActionPanel entity={selectedEntity} />
        </FloatingSidebar>}
    </>;
});
