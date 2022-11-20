import { useFormatting } from '../hooks/useFormatting';
import { RESOURCE_TO_UNIT } from '../models/ResourceUnits';
import { ResourceType } from '../models/types/ResourceType';
import { assert } from '../util/assert';

interface FormattedResourceProps {
    value: number;
    type: ResourceType;
    compact?: boolean;
}

export const FormattedResource = ({
    value,
    type,
    compact = false,
}: FormattedResourceProps) => {
    const { formatNumber } = useFormatting();

    const unit = RESOURCE_TO_UNIT.get(type);
    assert(unit != null, `Expected ${type} to have a unit.`);
    return formatNumber(
        value,
        {
            notation: compact ? 'compact' : 'standard',
            compactDisplay: 'short',
            unit,
            style: 'unit',
            maximumFractionDigits: 0,
        },
    );
};
