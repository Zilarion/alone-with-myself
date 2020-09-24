import * as React from 'react';

import styled from '../themed-components';

interface LabelValueProps {
    label: string;
    value: string | JSX.Element;
}
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
    return (<div>
        <StyledLabel>{label}</StyledLabel>
        <StyledValue>{value}</StyledValue>
    </div>);
}
