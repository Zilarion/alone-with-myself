import {
    Flex,
    List,
    ListItem,
    Progress,
    ProgressIndicator,
    Text,
} from '@hope-ui/solid';
import {
    For,
    Show,
} from 'solid-js';

import { Printers } from '../../../models/Printers';

interface PrintQueueProps {
    printers: Printers;
}

export const PrintQueue = (props: PrintQueueProps) => {
    return <List
        gap='$2'
        overflow='scroll'
    >
        <For each={props.printers.tasks}>
            {task => <ListItem>
                <Flex gap='$2' >
                    <Text color='$info9'>
                        {task.count}
                    </Text>
                    <Text>
                        {task.printable.id}
                    </Text>
                </Flex>
                <Show when={task.progressPercentage > 0}>
                    <Progress
                        size="xs"
                        value={task.progressPercentage * 100}
                    >
                        <ProgressIndicator />
                    </Progress>
                </Show>
            </ListItem>}
        </For>
    </List>;
};
