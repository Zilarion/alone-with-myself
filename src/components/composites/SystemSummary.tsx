import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { System } from '../../models/System';
import { ValueIndicator } from '../atoms/ValueIndicator';

interface SystemSummaryProps {
    system: System;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(2)}px;
`;

export const SystemSummary = observer(({ system }: SystemSummaryProps) => {
    return <Wrapper>
        <ValueIndicator
            value={system.exploredArea}
            max={system.totalArea}
            label="Area"
        />
        <ValueIndicator
            value={system.metals}
            max={system.totalMetals}
            label="Metals"
        />
    </Wrapper>;
});
