import BoltIcon from '@suid/icons-material/BoltOutlined';
import MassIcon from '@suid/icons-material/CycloneOutlined';
import { JSX } from 'solid-js';

import { ResourceType } from './types/ResourceType';

export const RESOURCE_TO_ICON = new Map<ResourceType, JSX.Element>([
    [ ResourceType.power, () => <BoltIcon fontSize='inherit' /> ],
    [ ResourceType.mass, () => <MassIcon fontSize='inherit' /> ],
]);
