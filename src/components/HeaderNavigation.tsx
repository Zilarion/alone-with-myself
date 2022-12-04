import {
    Box,
    Flex,
    Heading,
    Text,
} from '@hope-ui/solid';

import { useGame } from '../hooks/useGame';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';

export const HeaderNavigation = () => {
    const { satellite } = useGame();

    return <Flex
        padding="0 $4"
        gap="$2"
        verticalAlign={'center'}
        alignItems={'center'}
        height={'60px'}
        borderBottom="1px solid $neutral6"
    >
        <Heading level='6'>
            {satellite.name}
        </Heading>

        <Box
            width={'1px'}
            height={'30px'}
            background={'$primary6'}
            margin="$2"
        />
        <Text>
            Explored area
        </Text>
        <CircularProgressWithLabel
            size={30}
            value={satellite.exploredArea / satellite.totalArea}
        />
    </Flex>;
};
