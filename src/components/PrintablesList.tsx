import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import {
    Printable,
    Printers,
    ResourceStorage,
} from '../internal';
import { PrintableItem } from './PrintableItem';

interface PrintableSummaryProps {
    printables: Printable[];
    printableCount: number;
    storage: ResourceStorage;
    printers: Printers;
}

const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${p => p.theme.spacing(2)};
    overflow: scroll;
`;

export const PrintablesList = observer(({
    printables,
    printableCount,
    storage,
    printers,
}: PrintableSummaryProps) => {
    return <ListWrapper>
        {
            printables.map((printable) => {
                return <PrintableItem
                    key={printable.id}
                    printableCount={printableCount}
                    printable={printable}
                    storage={storage}
                    printers={printers}
                />;
            })
        }
    </ListWrapper>;
});
