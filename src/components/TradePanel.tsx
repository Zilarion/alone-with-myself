import {
    Entity,
    InteractionPoint,
    Transporter,
} from '../internal';
import { InteractionPointTrade } from './InteractionPointTrade';
import { TransporterTrade } from './TransporterTrade';

interface TradePanelProps {
    entity: Entity;
}

export function TradePanel({ entity }: TradePanelProps) {
    return <>
        {entity instanceof InteractionPoint && <InteractionPointTrade point={entity} />}
        {entity instanceof Transporter && <TransporterTrade transporter={entity} />}
    </>;
}
