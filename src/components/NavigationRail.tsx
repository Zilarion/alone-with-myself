import {
    Flex,
    IconButton,
} from '@hope-ui/solid';
import {
    Link,
    useMatch,
} from '@solidjs/router';
import BlurOn from '@suid/icons-material/BlurOn';
import Explore from '@suid/icons-material/Explore';

import { routes } from '../pages/routes';

export const NavigationRail = () => {
    const isAtScanner = useMatch(routes.scanner.path);
    const isAtSatellite = useMatch(routes.satellite.path);

    return <Flex
        direction='column'
        gap="$2"
    >
        <IconButton
            as={Link}
            href={routes.scanner.path()}
            icon={<Explore />}
            aria-label="Scanner"
            variant="ghost"
            color={isAtScanner() ? '$primary9' : '$white2'}
        />

        <IconButton
            as={Link}
            href={routes.satellite.path()}
            aria-label="Location"
            icon={<BlurOn />}
            variant="ghost"
            color={isAtSatellite() ? '$primary9' : '$white2'}
        />
    </Flex>;
};
