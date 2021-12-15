import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useGame } from 'src/internal';

import { Card } from '../../components/Card';
import { MultipleSelector } from '../../components/MultipleSelector';
import { PrintablesList } from '../../components/PrintablesList';
import { PrintQueue } from './internal/PrintQueue';
import { SatelliteSummary } from './internal/SatelliteSummary';

const Wrapper = styled.div`
    display: grid;
    gap: ${p => p.theme.spacing(2)};
    padding: ${p => p.theme.spacing(2)};
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    max-height: 100%;
    width: 100%;
    max-height: 100%;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(2)};
`;

export const SatellitePage = observer(() => {
    const { satellite } = useGame();
    const [ printableCount, setPrintableCount ] = useState(1);
    const {
        printables,
        storage,
        printers,
    } = satellite;

    return <Wrapper>
        <Card title="Printer control">
            <CardContent>
                <MultipleSelector
                    onChange={setPrintableCount}
                    value={printableCount}
                />
                <PrintablesList
                    printables={printables}
                    printableCount={printableCount}
                    storage={storage}
                    printers={printers}
                />
            </CardContent>
        </Card>
        <Card title="Print queue">
            <PrintQueue printers={printers} />
        </Card>
        <Card title="Resources">
            <SatelliteSummary satellite={satellite} />
        </Card>
    </Wrapper>;
});
