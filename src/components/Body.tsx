import * as React from 'react';
import {
    Arc,
    Circle,
    Group,
    Ring,
} from 'react-konva';

import { Orbit } from '../models';
import { Vector } from '../models/Vector';

interface BodyProps {
    position: Vector;
    radius: number;
    orbit?: Orbit;
    color: string;
}

export function Body({
    position,
    radius,
    orbit,
    color,
}: BodyProps) {
    return (
        <Group>
            {orbit && <Ring
                x={orbit.focus.position.x}
                y={orbit.focus.position.y}
                innerRadius={orbit.radius}
                outerRadius={orbit.radius}
                angle={2 * Math.PI}
                stroke='rgba(100, 100, 100, 0.4)'
            />}
            <Circle
                x={position.x}
                y={position.y}
                radius={radius}
                angle
                fill={color}
            />
        </Group>
    );
}
