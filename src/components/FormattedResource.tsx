import { useFormatting } from '../hooks/useFormatting';
import { RESOURCE_TO_UNIT } from '../models/ResourceUnits';
import { ResourceType } from '../models/types/ResourceType';
import { assert } from '../util/assert';

interface FormattedResourceProps {
    value: number;
    type: ResourceType;
    compact?: boolean;
}

export const FormattedResource = (props: FormattedResourceProps) => {
    const { formatNumber } = useFormatting();

    const unit = () => {
        const result = RESOURCE_TO_UNIT.get(props.type);
        assert(result != null, `Expected ${props.type} to have a unit.`);
        return result;
    };

    return formatNumber(
        props.value,
        {
            notation: props.compact ? 'compact' : 'standard',
            compactDisplay: 'short',
            unit: unit(),
            style: 'unit',
            maximumFractionDigits: 0,
        },
    );
};
