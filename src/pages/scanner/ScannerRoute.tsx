import { Route } from '../Route';
import { ScannerPage } from './ScannerPage';

const path = '/scanner';
export const ScannerRoute: Route = {
    path,
    element: <ScannerPage />,
    createPath: () => path,
};
