import {
    Flex,
    Grid,
} from '@hope-ui/solid';

import { HeaderNavigation } from '../components/HeaderNavigation';
import { NavigationRail } from '../components/NavigationRail';
import { ApplicationRoutes } from './ApplicationRoutes';

export const View = () => {
    return <Grid
        templateColumns={'auto 1fr'}
        templateRows={'100%'}
        height={'100%'}
    >
        <NavigationRail />
        <Flex
            direction={'column'}
            height={'100%'}
        >
            <HeaderNavigation />
            <ApplicationRoutes />
        </Flex>
    </Grid>;
};
