import styled from '@emotion/styled';

interface LabelValueProps {
    label: string;
    value: string | JSX.Element;
}

const StyledWrapper = styled.div`
    margin: ${p => p.theme.spacing(2)}px 0;
`;

const StyledLabel = styled.div`
    color: ${p => p.theme.palette.header};
    margin-bottom: ${p => p.theme.spacing(1)}px;
    font-size: 16px;
`;

const StyledValue = styled.div`
    color: ${p => p.theme.palette.text.primary};
    font-size: 14px;
`;

export const LabelValue = ({
    value, label,
}: LabelValueProps) => {
    return (<StyledWrapper>
        <StyledLabel>
            {label}
        </StyledLabel>
        <StyledValue>
            {value}
        </StyledValue>
    </StyledWrapper>);
};
