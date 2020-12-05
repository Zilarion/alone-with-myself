import { observer } from 'mobx-react-lite';
import * as React from 'react';

import {
    AsteroidBelt,
    Body,
} from '../models';
import { Table } from './Table';

interface SatelliteSummaryProps {
    satellites: (Body | AsteroidBelt)[];
}

export const SatelliteSummary = observer(({ satellites }: SatelliteSummaryProps) => {
    const data = satellites.map((satellite) => [
        satellite.id,
        satellite instanceof Body ? 'Planetary body' : 'Asteroid belt',
    ]);

    return <Table
        headers={[ 'Id', 'Type' ]}
        data={data}
    />;
});
