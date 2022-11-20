import {
    Box,
    Table as HopeUiTable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@hope-ui/solid';
import {
    For,
    JSX,
    Match,
    Show,
    Switch,
} from 'solid-js';

type Alignment = 'left' | 'right';

interface TableProps {
    headers?: string[];
    align?: Alignment[];
    data: Array<Array<string | JSX.Element>>;
}

const NoData = () => {
    return <Box
        textAlign={'center'}
        width={'100%'}
        color="$primary1"
    >
        No data
    </Box>;
};

const TableWithData = (props: TableProps) => {
    const width = () => Math.floor(100 / props.data[0].length);

    return <HopeUiTable>
        <Show when={props.headers}>
            <Thead>
                <Tr>
                    <For each={props.headers}>
                        {(headerCell, index) =>
                            <Th
                                width={width()}
                                textAlign={props.align?.[index()]}
                            >
                                {headerCell}
                            </Th>}
                    </For>
                </Tr>
            </Thead>
        </Show>
        <Tbody>
            <For each={props.data}>
                {row => <Tr>
                    <For each={row}>
                        {(cell, index) => <Td
                            width={width()}
                            textAlign={props.align?.[index()]}
                        >
                            {cell}
                        </Td>}
                    </For>
                </Tr>}
            </For>
        </Tbody>
    </HopeUiTable>;
};

export const Table = (props: TableProps) => {
    return <Switch>
        <Match when={props.data.length === 0}>
            <NoData />
        </Match>
        <Match when={props.data.length > 0}>
            <TableWithData {...props} />
        </Match>
    </Switch>;
};
