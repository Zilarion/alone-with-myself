import {
    Flex,
    Text,
} from '@hope-ui/solid';

import { PrintableInstance } from '../models/PrintableUnion';
import { ResourceSetSummary } from './ResourceSetSummary';

interface PrintableTooltipProps {
    printable: PrintableInstance;
}

export const PrintableTooltip = (props: PrintableTooltipProps) => {
    return <Flex
        direction='column'
        gap='$2'
    >
        <Text
            fontWeight={'bold'}
            textAlign={'center'}
            borderBottom={'1px solid $neutral6'}
        >
            {props.printable.id}
        </Text>
        <ResourceSetSummary resources={props.printable.cost} />
    </Flex>;
};
