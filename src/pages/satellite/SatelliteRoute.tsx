import { Route } from '../Route';
import { SatellitePage } from './SatellitePage';

const path = '/satellite';
export const SatelliteRoute: Route = {
    path,
    element: <SatellitePage />,
    createPath: () => path,
};
