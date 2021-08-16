import { observer } from 'mobx-react-lite';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { Scanner } from './Scanner';

export const Routes = observer(() => {
    return <Switch>
        <Route path="/technology">
                Tech placeholder
        </Route>

        <Route path="/">
            <Scanner />
        </Route>
    </Switch>;
});
