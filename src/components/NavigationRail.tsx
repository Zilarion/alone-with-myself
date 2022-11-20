import {
    Flex,
    IconButton,
} from '@hope-ui/solid';
import { NavLink } from '@solidjs/router';
import BlurOn from '@suid/icons-material/BlurOn';
import Explore from '@suid/icons-material/Explore';

import { routes } from '../pages/routes';

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: ${p => p.theme.spacing(1)};
//     align-items: center;
//     .active > svg {
//         color: ${p => p.theme.palette.secondary.main};
//         fill: ${p => p.theme.palette.secondary.main};
//     }
//     margin-top: 56px;
//     flex: auto;
// `;

export const NavigationRail = () => {
    return <Flex
        direction='column'
        padding="$1"
        gap="$1"
    >
        <NavLink
            href={routes.scanner.path()}
        >
            <IconButton
                icon={<Explore />}
                aria-label="Scanner"
                variant="ghost"
            />
        </NavLink>

        <NavLink href={routes.satellite.path()}>
            <IconButton
                aria-label="Location"
                icon={<BlurOn />}
                variant="ghost"
            />
        </NavLink>
    </Flex>;
};
