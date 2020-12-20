import { observer } from 'mobx-react-lite';
import { FormattedNumber } from 'react-intl';

import { Body } from '../drawables/Body';
import { Card } from './Card';
import { LabelValue } from './LabelValue';
import { SatelliteSummary } from './SatelliteSummary';

interface BodySummaryProps {
    body: Body;
}

export const BodySummary = observer(({
    body: {
        mass,
        radius,
        id,
        orbit,
        satellites,
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
        <>
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

                <LabelValue
                    label="Satellites"
                    value={
                        <SatelliteSummary satellites={satellites} />
                    }
                />
            </Card>
        </>
    );
});
