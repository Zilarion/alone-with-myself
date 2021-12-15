import {
    Route,
    Routes as RouterRoutes,
} from 'react-router-dom';
import { routes } from 'src/internal';

export const ApplicationRoutes = () => {
    return <RouterRoutes>
        <Route {...routes.satellite} />
        <Route {...routes.scanner} />
        <Route
            path="*"
            element={routes.scanner.element}
        />
    </RouterRoutes>;
};
