import {
    Flex,
    Text,
} from '@hope-ui/solid';

import { Printable } from '../models/PrintableUnion';
import { ResourceSetSummary } from './ResourceSetSummary';

interface PrintableTooltipProps {
    printable: Printable;
}

export const PrintableTooltip = ({
    printable: {
        id,
        cost,
    },
}: PrintableTooltipProps) => {
    return <Flex
        direction='column'
        gap='$2'
    >
        <Text
            fontWeight={'bold'}
            textAlign={'center'}
            borderBottom={'1px solid $neutral6'}
        >
            {id}
        </Text>
        <ResourceSetSummary resources={cost} />
    </Flex>;
};
