import {
    Box,
    Flex,
    Heading,
    Text,
} from '@hope-ui/solid';

import { useGame } from '../hooks/useGame';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';
import { ResourceSetSummary } from './ResourceSetSummary';

export const HeaderNavigation = () => {
    const { satellite } = useGame();
    const explored = () => satellite.exploredArea / satellite.totalArea;

    return (
        <Flex
            padding="0 $4"
            gap="$2"
            verticalAlign={'center'}
            alignItems={'center'}
            height={'60px'}
            borderBottom="1px solid $neutral6"
        >
            <Heading level="6">{satellite.name}</Heading>

            <Box width={'1px'} height={'30px'} background={'$primary6'} margin="$2" />
            <Text>Explored area</Text>
            <CircularProgressWithLabel
                size={30}
                value={explored()}
            />

            <ResourceSetSummary storage={satellite.storage} />
        </Flex>
    );
};
