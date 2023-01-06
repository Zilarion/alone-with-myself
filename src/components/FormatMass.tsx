import { Text } from '@hope-ui/solid';
import MassIcon from '@suid/icons-material/CycloneOutlined';
import { Show } from 'solid-js';

import { FormatChange } from './FormatChange';
import { FormatNumber } from './FormatNumber';

interface FormatMassProps {
    amount: number;
    change?: number;
    disabled?: boolean;
}

export const FormatMass = (props: FormatMassProps) => {
    const color = () => props.disabled ? '$neutral7' : '$info10';

    return (
        <Text color={color()} display="flex" alignItems='center'>
            <FormatNumber
                value={props.amount}
                compact
            />
            <MassIcon fontSize='inherit' />

            <Show when={props.change != null}>
                <FormatChange
                    value={props.change!}
                />
            </Show>
        </Text>
    );
};
