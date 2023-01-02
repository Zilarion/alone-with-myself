import {
    Button,
    Grid,
} from '@hope-ui/solid';
import { For } from 'solid-js';

import { Card } from '../../components/Card';
import { ResourceIndicator } from '../../components/ResourceIndicator';
import { useGame } from '../../hooks/useGame';

export const ScannerPage = () => {
    const { satellite } = useGame();

    return <Grid
        gap="$2"
        padding="$2"
        templateColumns="repeat(3, 1fr)"
        templateRows="1fr"
        maxH="100%"
        width="100%"
    >
        <Card title="Operations">
            <Button
                loading={satellite.scanStatus.scanning}
                onClick={satellite.startScan}
                loadingText={`Scanning... (${Math.round(satellite.scanStatus.progress)}%)`}
                variant="outline"
            >
            Scan area
            </Button>
        </Card>

        <Card title="Discovered resources">
            <For each={satellite.totalSatelliteResources.resources}>
                {resource => <ResourceIndicator resource={resource} />}
            </For>
        </Card>
    </Grid>;
};
