import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Body } from '../models';
import { Header } from './Header';
import { LabelValue } from './LabelValue';

interface BodySummaryProps {
    body: Body;
}

export const BodySummary = observer(({
    body: {
        mass,
        radius,
        id,
        orbit,
    },
}: BodySummaryProps) => {
    const orbitInfo = orbit && (<>
        <LabelValue
            label="Orbital velocity"
            value={`${orbit.velocity} m/s`}
        />
        <LabelValue
            label="Orbital distance"
            value={`${orbit.radius} km`} />
    </>);

    return (
        <div>
            <Header>{ id }</Header>
            <LabelValue
                label="Mass"
                value={`${ mass.toFixed(0) } kg`}
            />
            <LabelValue
                label="Radius"
                value={`${ radius.toFixed(0) } km`}
            />
            { orbitInfo }
        </div>
    );
});
