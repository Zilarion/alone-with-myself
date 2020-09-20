import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useWindowSize } from '../hooks';
import {
    AsteroidBelt,
    Body,
    Game,
    ResourcePoint,
} from '../models';
import { AsteroidBeltSummary } from './AsteroidBeltSummary';
import { BodySummary } from './BodySummary';
import { FloatingSidebar } from './FloatingSidebar';
import { ResourcePointSummary } from './ResourcePointSummary';

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

    const selected = game?.selectedEntity;

    return (
        <div>
            <canvas
                width={width}
                height={height}
                ref={canvasRef}
            />

            <FloatingSidebar>
                {selected instanceof Body && <BodySummary body={selected} />}
                {selected instanceof ResourcePoint && <ResourcePointSummary point={selected} />}
                {selected instanceof AsteroidBelt && <AsteroidBeltSummary belt={selected} />}
            </FloatingSidebar>
        </div>
    );
});
