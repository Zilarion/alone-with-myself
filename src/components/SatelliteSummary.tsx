import { observer } from 'mobx-react-lite';

import { AsteroidBelt } from '../drawables/AsteroidBelt';
import { Body } from '../models';
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
