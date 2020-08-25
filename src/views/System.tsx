import * as React from 'react';

import { useWindowSize } from '../hooks';
import { Game } from '../models';

export const System = () => {
    const {
        height,
        width,
    } = useWindowSize();
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) {
            throw Error('Expected canvas to exist');
        }
        new Game(canvas);
    });

    return <div>
        <canvas
            width={width}
            height={height}
            ref={canvasRef}
        />
    </div>;
};
