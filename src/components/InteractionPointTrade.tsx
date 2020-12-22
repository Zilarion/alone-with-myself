import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { observer } from 'mobx-react-lite';

import { Transporter } from '../drawables/Transporter';
import { useGame } from '../hooks/useGame';
import { InteractionPoint } from '../internal';
import styled from '../themed-components';
import { Card } from './Card';
import { ResourceSetSummary } from './ResourceSetSummary';

interface InteractionPointTradeProps {
    point: InteractionPoint;
}

const ResourceWrapper = styled.div`
    display: grid;
    grid-gap: ${p => p.theme.margin.medium};
`;

const ResourceInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${p => p.theme.margin.medium};
`;

const TransporterSummary = observer(({ transporter: { speed } }: { transporter: Transporter }) => {
    return <ResourceSetSummary
        resources={speed}
    />;
});

export const InteractionPointTrade = observer(({ point }: InteractionPointTradeProps) => {
    const {
        outgoing,
        incoming,
    } = point;

    const {
        setTransportSource,
        transportSource,
    } = useGame();

    const outgoingSummary = outgoing.map((outTransporter, idx) => (
        <TransporterSummary key={idx} transporter={outTransporter} />
    ));

    const incomingSummary = incoming.map((inTransporter, idx) => (
        <TransporterSummary key={idx} transporter={inTransporter} />
    ));

    return (
        <ResourceWrapper>
            <Card header="Trade routes">
                <ResourceInfoWrapper>
                    <div>
                        Incoming:
                        {incomingSummary}
                    </div>
                    <div>
                        Outgoing:
                        {!transportSource &&
                            <IconButton size="small" onClick={() => setTransportSource(point)}>
                                <Add />
                            </IconButton>
                        }
                        {outgoingSummary}
                    </div>
                </ResourceInfoWrapper>
            </Card>
        </ResourceWrapper>
    );
});
