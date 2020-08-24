import * as React from 'react';
import {
    Stage,
    Layer, Text,
} from 'react-konva';
import { useWindowSize } from '../hooks';

export const System = () => {
    const {
        height, width,
    } = useWindowSize();
    return (
        <Stage width={width} height={height}>
            <Layer>
                <Text text="Try click on rect" />
                {/* <ColoredRect /> */}
            </Layer>
        </Stage>
    );
};
