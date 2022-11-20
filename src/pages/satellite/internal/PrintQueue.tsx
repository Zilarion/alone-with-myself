import {
    List,
    ListItem,
    Text,
} from '@hope-ui/solid';
import { For } from 'solid-js';

import { CircularProgressWithLabel } from '../../../components/CircularProgressWithLabel';
import { Printers } from '../../../models/Printers';

interface PrintQueueProps {
    printers: Printers;
}

export const PrintQueue = ({ printers: { tasks } }: PrintQueueProps) => {
    return <List
        display='flex'
        gap='$2'
        overflow='scroll'
    >
        <For each={tasks}>
            {task => <ListItem>
                <CircularProgressWithLabel
                    value={task.progressPercentage * 100}
                />
                <Text>
                    {task.printable.id}
                </Text>
                <Text>
                    {`Printing ${task.count}`}
                </Text>
            </ListItem>}
        </For>
    </List>;
};
