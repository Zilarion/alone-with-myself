import * as React from 'react';

import styled from '../themed-components';

interface LabelValueProps {
    label: string;
    value: string | JSX.Element;
}

const StyledWrapper = styled.div`
    margin: ${p => p.theme.margin.small}
`;

const StyledLabel = styled.div`
    color: ${p => p.theme.color.header};
    font-size: 16px;
`;

const StyledValue = styled.div`
    color: ${p => p.theme.color.text};
    font-size: 14px;
`;

export function LabelValue({
    value, label,
}: LabelValueProps) {
    return (<StyledWrapper>
        <StyledLabel>{label}</StyledLabel>
        <StyledValue>{value}</StyledValue>
    </StyledWrapper>);
}
