import { FormattedNumber } from 'react-intl';

import {
    assert,
    RESOURCE_TO_UNIT,
    ResourceType,
} from '../internal';

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
    const unit = RESOURCE_TO_UNIT.get(type);
    assert(unit != null, `Expected ${type} to have a unit.`);
    return <FormattedNumber
        value={value}
        style="unit"
        unit={unit}
        notation={compact ? 'compact' : 'standard'}
        maximumFractionDigits={0}
    />;
};
