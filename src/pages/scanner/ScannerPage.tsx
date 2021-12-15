import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { Button } from '../../components/Button';

const Wrapper = styled.h2`
    color: ${({ theme }) => theme.palette.primary.main};
    margin-top: ${p => p.theme.spacing(2)}px;
`;

export const ScannerPage = observer(() => {
    return <Wrapper>
        <Button>
            Scan area
        </Button>
    </Wrapper>;
});
