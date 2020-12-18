import { observer } from 'mobx-react-lite';

import { AsteroidBelt } from '../models';
import { Card } from './Card';
import { LabelValue } from './LabelValue';

interface AsteroidBeltSummaryProps {
    belt: AsteroidBelt;
}

export const AsteroidBeltSummary = observer(({ belt: { bodies } }: AsteroidBeltSummaryProps) => {
    return (
        <Card header="Asteroid belt">
            <LabelValue
                label="Number of asteroids"
                value={`${ bodies.length }`}
            />
        </Card>
    );
});
