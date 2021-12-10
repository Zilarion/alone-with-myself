import { observer } from 'mobx-react-lite';
import {
    Route,
    Routes as RouterRoutes,
} from 'react-router-dom';

import { Scanner } from './Scanner';

export const Routes = observer(() => {
    return <RouterRoutes>
        <Route
            path="*"
            element={<Scanner />}
        />
    </RouterRoutes>;
});
