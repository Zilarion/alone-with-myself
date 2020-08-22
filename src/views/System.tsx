import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Game } from '../models/Game';

export const System = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    console.log("HI");
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) {
            throw Error("Expected canvas to exist");
        }
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            throw Error("Expected context to exist");
        }
        new Game(ctx);
    })

    return <div>
        <canvas
            width={window.innerWidth}
            height={window.innerHeight}
            ref={canvasRef}
        />
    </div>
}
