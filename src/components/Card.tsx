import {
    Box,
    Flex,
    Heading,
} from '@hope-ui/solid';
import { JSX } from 'solid-js';

interface CardProps {
    children: JSX.Element;
    title: string;
}

export const Card = (props: CardProps) => {
    return <Flex
        direction={'column'}
        gap='$2'
        borderWidth="1px"
        borderColor="$neutral6"
        borderRadius="$lg"
        padding='$4'
        overflow="hidden"
    >
        <Heading level="6">
            {props.title}
        </Heading>
        <Box overflow='scroll'>
            {props.children}
        </Box>
    </Flex>;
};
