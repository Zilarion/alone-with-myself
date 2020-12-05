import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useWindowSize } from '../hooks';
import { Game } from '../models';

interface SystemProps {
    game: Game;
}

export const System = observer(({ game }: SystemProps) => {
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
        game.setCanvas(canvas);
    }, [ game ]);

    return (
        <canvas
            width={width}
            height={height}
            ref={canvasRef}
        />
    );
});
