import { observer } from 'mobx-react-lite';
import {
    Route,
    Switch,
} from 'react-router-dom';

import { FloatingSidebar } from '../components/FloatingSidebar';

export const Routes = observer(() => {
    return <Switch>
        <Route path="/technology">
            Tech placeholder
        </Route>

        <Route path="/">
            <FloatingSidebar side={'left'}>
                sidebar
            </FloatingSidebar>
            content
        </Route>
    </Switch>;
});
