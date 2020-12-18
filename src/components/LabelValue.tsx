

import styled from '../themed-components';

interface LabelValueProps {
    label: string;
    value: string | JSX.Element;
}

const StyledWrapper = styled.div`
    margin: ${p => p.theme.margin.small} 0;
`;

const StyledLabel = styled.div`
    color: ${p => p.theme.color.header};
    margin-bottom: ${p => p.theme.margin.tiny};
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
