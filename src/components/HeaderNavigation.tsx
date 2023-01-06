import {
    Box,
    Flex,
    Heading,
    Text,
} from '@hope-ui/solid';

import { useGame } from '../hooks/useGame';
import { MaterialsSummary } from './MaterialsSummary';

export const HeaderNavigation = () => {
    const { satellite } = useGame();
    const explored = () => satellite.exploredArea / satellite.totalArea;

    return (
        <Flex
            padding="$2 $4 0 $4"
            direction='column'
            verticalAlign={'center'}
        >
            <Flex
                gap="$2"
                alignItems={'center'}
            >
                <Heading level="6">{satellite.name}</Heading>
                <Box width={'1px'} height={'20px'} background={'$whiteAlpha6'} margin="$2" />
                <Text>{`Explored area: ${explored()}%`}</Text>
            </Flex>

            <MaterialsSummary materials={satellite.materials} />
        </Flex>
    );
};
