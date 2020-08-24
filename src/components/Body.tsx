import {
    animated,
    useSpring,
} from '@react-spring/konva';

import * as React from 'react';
import {
    Group,
    Ring,
} from 'react-konva';

import {
    Orbit,
    Vector,
} from '../models';

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
    const props = useSpring({
        x: position.x,
        y: position.y,
    });

    return (
        <Group>
            {orbit && <Ring
                x={orbit.focus.position.x}
                y={orbit.focus.position.y}
                innerRadius={orbit.radius}
                outerRadius={orbit.radius}
                stroke='rgba(100, 100, 100, 0.4)'
            />}
            <animated.Circle
                {... props}
                radius={radius}
                angle
                fill={color}
            />
        </Group>
    );
}
