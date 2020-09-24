import * as React from 'react';
import { FormattedNumber } from 'react-intl';

import {
    RESOURCE_TO_UNIT,
    ResourceType,
} from '../models';
import { assert } from '../util';

interface FormattedResourceProps {
    value: number;
    type: ResourceType;
}

export function FormattedResource({
    value,
    type,
}: FormattedResourceProps) {
    const unit = RESOURCE_TO_UNIT.get(type);
    assert(unit != null, `Expected ${type} to have a unit.`);
    return <FormattedNumber
        value={value}
        style="unit"
        unit={unit}
        maximumFractionDigits={0}
    />;
}
