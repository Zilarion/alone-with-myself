import {
    Entity,
    InteractionPoint,
} from '../internal';
import { InteractionPointTrade } from './InteractionPointTrade';

interface TradePanelProps {
    entity: Entity;
}

export function TradePanel({ entity }: TradePanelProps) {
    return <>
        {entity instanceof InteractionPoint && <InteractionPointTrade point={entity} />}
    </>;
}
