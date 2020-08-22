import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Game } from '../models/Game';

export const System = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) {
            throw Error("Expected canvas to exist");
        }
        new Game(canvas);
    })

    return <div>
        <canvas
            width={window.innerWidth}
            height={window.innerHeight}
            ref={canvasRef}
        />
    </div>
}
