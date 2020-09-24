import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import { Body } from '../models';
import { Card } from './Card';
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
            value={
                <FormattedNumber
                    value={orbit.velocity}
                    style="unit"
                    unit="meter-per-second"
                />
            }
        />
        <LabelValue
            label="Orbital distance"
            value={
                <FormattedNumber
                    value={orbit.radius * 1e3}
                    style="unit"
                    notation="scientific"
                    unit="kilometer"
                />
            }
        />
    </>);

    return (
        <Card header={id}>
            <LabelValue
                label="Mass"
                value={
                    <FormattedNumber
                        value={mass * 1e27}
                        style="unit"
                        notation="scientific"
                        unit="kilogram"
                    />
                }
            />
            <LabelValue
                label="Radius"
                value={
                    <FormattedNumber
                        value={radius * 1e3}
                        style="unit"
                        notation="scientific"
                        unit="kilometer"
                    />
                }
            />
            { orbitInfo }
        </Card>
    );
});
