import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useWindowSize } from '../hooks';
import { Game } from '../models';
import { BodySummary } from './BodySummary';
import { FloatingSidebar } from './FloatingSidebar';

export const System = observer(() => {
    const {
        height,
        width,
    } = useWindowSize();
    const [ game, setGame ] = React.useState<Game>();
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) {
            throw Error('Expected canvas to exist');
        }
        setGame(new Game(canvas));
    }, []);

    return (
        <div>
            <canvas
                width={width}
                height={height}
                ref={canvasRef}
            />

            <FloatingSidebar>
                {game?.selectedBody && <BodySummary body={game?.selectedBody} />}
            </FloatingSidebar>
        </div>
    );
});
