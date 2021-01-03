import {
    IconButton,
    Snackbar,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import { observer } from 'mobx-react-lite';
import {
    useEffect,
    useRef,
} from 'react';

import { useGame } from '../hooks/useGame';
import {
    assert,
    useWindowSize,
} from '../internal';

export const System = observer(() => {
    const {
        height,
        width,
    } = useWindowSize();
    const game = useGame();
    const {
        transportSource,
        setTransportSource,
    } = game;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        assert(canvas != null, 'Expected canvas to exist');
        game.setCanvas(canvas);
    }, [ game ]);

    return (
        <>
            {transportSource &&
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={true}
                >
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setTransportSource(null)}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Select another point to connect trade route to
                    </Alert>
                </Snackbar>
            }
            <canvas
                width={width}
                height={height}
                ref={canvasRef}
            />
        </>
    );
});
