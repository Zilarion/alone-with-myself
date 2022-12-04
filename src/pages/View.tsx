import { Flex } from '@hope-ui/solid';

import { HeaderNavigation } from '../components/HeaderNavigation';
import { NavigationRail } from '../components/NavigationRail';
import { ApplicationRoutes } from './ApplicationRoutes';

export const View = () => {
    return <Flex direction={'column'} >
        <HeaderNavigation />
        <Flex
            padding="$2"
            gap='$2'
            height={'100%'}
        >
            <NavigationRail />
            <ApplicationRoutes />
        </Flex>
    </Flex>;
};
