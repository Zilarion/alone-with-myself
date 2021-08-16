import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { Button } from '../components/Button';
import { useGame } from '../hooks/useGame';

const Wrapper = styled.h2`
    color: ${({ theme }) => theme.palette.primary.main};
    margin-top: ${p => p.theme.spacing(2)}px;
`;

export const Scanner = observer(() => {
    const { system: { fullyExplored } } = useGame();

    return <Wrapper>
        <Button
            disabled={fullyExplored}
        >
            Scan area
        </Button>
    </Wrapper>;
});
