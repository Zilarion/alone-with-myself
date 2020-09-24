import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useWindowSize } from '../hooks';
import { Game } from '../models';
import { ActionPanel } from './ActionPanel';
import { FloatingSidebar } from './FloatingSidebar';
import { InformationPanel } from './InformationPanel';

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

            {selected && <FloatingSidebar side={'left'}>
                <InformationPanel entity={selected} />
            </FloatingSidebar>}

            {selected && <FloatingSidebar side={'right'}>
                <ActionPanel entity={selected} />
            </FloatingSidebar>}
        </div>
    );
});
