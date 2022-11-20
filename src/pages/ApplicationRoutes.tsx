import {
    Route,
    Routes,
} from '@solidjs/router';

import { routes } from './routes';
import { SatellitePage } from './satellite/SatellitePage';
import { ScannerPage } from './scanner/ScannerPage';

export const ApplicationRoutes = () => {
    return <Routes>
        <Route
            path={routes.satellite.path()}
            element={<SatellitePage />}
        />
        <Route
            path={routes.scanner.path()}
            element={<ScannerPage />}
        />
        <Route
            path="*"
            element={<ScannerPage />}
        />
    </Routes>;
};
