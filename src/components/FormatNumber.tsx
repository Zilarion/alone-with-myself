import { useFormatting } from '../hooks/useFormatting';

interface FormattedResourceProps {
    value: number;
    compact?: boolean;
}

export const FormatNumber = (props: FormattedResourceProps) => {
    const { formatNumber } = useFormatting();

    const formattedNumber = () => formatNumber(
        props.value,
        {
            notation: props.compact ? 'compact' : 'standard',
            compactDisplay: 'short',
            maximumFractionDigits: 0,
        },
    );

    return <>{formattedNumber()}</>;
};
