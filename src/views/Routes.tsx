import { observer } from 'mobx-react-lite';
import {
    Route,
    Routes as RouterRoutes,
} from 'react-router-dom';

import { useGame } from '../hooks/useGame';
import { SatellitePage } from './satellite/SatellitePage';
import { Scanner } from './Scanner';

export const Routes = observer(() => {
    const { satellite } = useGame();
    return <RouterRoutes>
        <Route
            path="satellite"
            element={<SatellitePage satellite={satellite} />}
        />
        <Route
            path="*"
            element={<Scanner />}
        />
    </RouterRoutes>;
});
