import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

interface LabelValueProps {
    value: number;
    max: number;
}

const StyledWrapper = styled.div`
    gap: ${p => p.theme.spacing(1)}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const StyledValue = styled(Typography)`
    text-align: left;
`;

const StyledMax = styled(Typography)`
    text-align: right;
`;

export const CurrentMaxValue = ({
    max,
    value,
}: LabelValueProps) => {
    return (<StyledWrapper>
        <StyledValue color="primary">
            {value}
        </StyledValue>
        <StyledMax color="primary">
            {max}
        </StyledMax>
    </StyledWrapper>);
};
