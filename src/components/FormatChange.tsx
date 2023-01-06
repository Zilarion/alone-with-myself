import { Text } from '@hope-ui/solid';

import { FormatNumber } from './FormatNumber';

interface FormatMassProps {
    value: number;
}

export const FormatChange = (props: FormatMassProps) => {
    const color = () => props.value > 0 ? '$success10' : '$danger10';

    return (
        <Text
            color={color()}
        >
            ({props.value! > 0 ? '+' : ''}
            <FormatNumber
                value={props.value!}
                compact
            />)
        </Text>
    );
};
