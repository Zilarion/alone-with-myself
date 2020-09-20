import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { AsteroidBelt } from '../models';
import { Header } from './Header';
import { LabelValue } from './LabelValue';

interface AsteroidBeltSummaryProps {
    belt: AsteroidBelt;
}

export const AsteroidBeltSummary = observer(({ belt: { bodies } }: AsteroidBeltSummaryProps) => {
    return (
        <div>
            <Header>Asteroid Belt</Header>
            <LabelValue
                label="Number of asteroids"
                value={`${ bodies.length }`}
            />
        </div>
    );
});
