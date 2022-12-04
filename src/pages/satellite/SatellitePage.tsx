import {
    Flex,
    Grid,
} from '@hope-ui/solid';
import { createSignal } from 'solid-js';

import { Card } from '../../components/Card';
import { MultipleSelector } from '../../components/MultipleSelector';
import { PrintablesList } from '../../components/PrintablesList';
import { useGame } from '../../hooks/useGame';
import { PrintQueue } from './internal/PrintQueue';
import { SatelliteSummary } from './internal/SatelliteSummary';

export const SatellitePage = () => {
    const { satellite } = useGame();
    const [ printableCount, setPrintableCount ] = createSignal(1);

    return <Grid
        gap="$2"
        padding="$2"
        templateColumns="repeat(3, 1fr)"
        templateRows="1fr"
        maxH="100%"
        width="100%"
    >
        <Card title="Printer control">
            <Flex
                direction='column'
                gap='$3'
            >
                <MultipleSelector
                    onChange={setPrintableCount}
                    value={printableCount()}
                />
                <PrintablesList
                    printables={satellite.printables}
                    printableCount={printableCount()}
                    storage={satellite.storage}
                    printers={satellite.printers}
                />
            </Flex>
        </Card>
        <Card title="Print queue">
            <PrintQueue printers={satellite.printers} />
        </Card>
        <Card title="Resources">
            <SatelliteSummary satellite={satellite} />
        </Card>
    </Grid>;
};
