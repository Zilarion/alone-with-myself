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

export const Card = ({
    children,
    title,
}: CardProps) => {
    return <Box
        maxW="$sm"
        borderWidth="1px"
        borderColor="$neutral6"
        borderRadius="$lg"
        overflow="hidden"
    >
        <Flex
            direction={'column'}
            padding="$2"
        >
            <Heading level="6">
                {title}
            </Heading>
            <Box overflow='scroll'>
                {children}
            </Box>
        </Flex>
    </Box>;
};
