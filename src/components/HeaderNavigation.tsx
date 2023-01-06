import {
    Flex,
    Heading,
    Text,
} from '@hope-ui/solid';

import { useGame } from '../hooks/useGame';
import { MaterialsSummary } from './MaterialsSummary';
import { VerticalDivider } from './VerticalDivider';

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
                <VerticalDivider />
                <Text>{`Explored area: ${explored()}%`}</Text>
            </Flex>

            <MaterialsSummary materials={satellite.materials} />
        </Flex>
    );
};
