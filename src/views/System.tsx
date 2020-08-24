import * as React from 'react';
import {
    Layer,
    Rect,
    Stage,
} from 'react-konva';

import { Body } from '../components';
import { useWindowSize } from '../hooks';
import { Game } from '../models';

interface SystemProps {
    game: Game;
}

export const System = ({ game }: SystemProps) => {
    const {
        height,
        width,
    } = useWindowSize();

    return (
        <Stage width={width} height={height}>
            <Layer>
                { game.bodies.map((body) =>
                    <Body
                        key={body.id}
                        color={body.color}
                        position={body.position}
                        radius={body.radius}
                        orbit={body.orbit}
                    />,
                )}
            </Layer>
        </Stage>
    );
};
