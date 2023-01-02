import { useFormatting } from '../hooks/useFormatting';
import { RESOURCE_TO_ICON } from '../models/ResourceUnits';
import { ResourceType } from '../models/types/ResourceType';
import { assert } from '../util/assert';

interface FormattedResourceProps {
    value: number;
    type: ResourceType;
    compact?: boolean;
}

export const FormattedResource = (props: FormattedResourceProps) => {
    const { formatNumber } = useFormatting();

    const icon = () => {
        const result = RESOURCE_TO_ICON.get(props.type);
        assert(result != null, `Expected ${props.type} to have a unit.`);
        return result;
    };

    const formattedNumber = formatNumber(
        props.value,
        {
            notation: props.compact ? 'compact' : 'standard',
            compactDisplay: 'short',
            maximumFractionDigits: 0,
        },
    );
    return <>{formattedNumber} {icon()}</>;
};
