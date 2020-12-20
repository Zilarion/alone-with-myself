import { Vector } from '../models/types';

interface Viewport {
    left: number;
    top: number;
    width: number;
    height: number;
    scale: Vector;
}

interface CanvasCameraProps {
    context: CanvasRenderingContext2D;
    zoomBound?: {
        min?: number;
        max?: number;
    };
}

export class CanvasCamera {
    private _context: CanvasRenderingContext2D;
    private _viewport: Viewport;
    private _center: Vector;
    private _zoom: number;
    private _zoomMinBound: number;
    private _zoomMaxBound?: number;

    constructor({
        context,
        zoomBound,
    }: CanvasCameraProps) {
        this._zoom = 50000;
        this._center = {
            x: 0,
            y: 0,
        };
        this._zoomMinBound = zoomBound?.min ?? 0;
        this._zoomMaxBound = zoomBound?.max;
        this._context = context;
        this._viewport = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            scale: {
                x: 1,
                y: 1,
            },
        };

        this._addListeners();
        this._updateViewport();
    }


    public set zoom(distance: number) {
        this._zoom = Math.max(distance, this._zoomMinBound);
        if (this._zoomMaxBound) {
            this._zoom = Math.min(distance, this._zoomMaxBound);
        }
        this._updateViewport();
    }

    public moveTo(vector: Vector) {
        this._center = vector;
        this._updateViewport();
    }

    public apply() {
        // TODO we should be able to get rid of this update
        // it's only needed on initialize somehow
        this._updateViewport();
        this._context.save();
        this._scaleViewport();
        this._translateViewport();
    }

    public restore() {
        this._context.restore();
    }

    public screenToWorld({
        x,
        y,
    }: Vector) {
        const {
            left,
            top,
            scale,
        } = this._viewport;

        return {
            x: (x / scale.x) + left,
            y: (y / scale.y) + top,
        };
    }

    public worldToScreen({
        x,
        y,
    }: Vector): Vector {
        const {
            left,
            top,
            scale,
        } = this._viewport;

        return {
            x: (x - left) * scale.x,
            y: (y - top) * scale.y,
        };
    }

    public get viewport() {
        return this._viewport;
    }

    private _scaleViewport() {
        this._context.scale(
            this._viewport.scale.x,
            this._viewport.scale.y,
        );
    }

    private _translateViewport() {
        this._context.translate(
            -this._viewport.left,
            -this._viewport.top,
        );
    }

    private _updateViewport() {
        const aspectRatio = this._context.canvas.width / this._context.canvas.height;
        this._viewport.width = this._zoom;
        this._viewport.height = this._viewport.width / aspectRatio;
        this._viewport.left = this._center.x - (this._viewport.width / 2.0);
        this._viewport.top = this._center.y - (this._viewport.height / 2.0);
        this._viewport.scale.x = this._context.canvas.width / this._viewport.width;
        this._viewport.scale.y = this._context.canvas.height / this._viewport.height;
    }

    private _addListeners() {
        this._context.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.altKey) {
                const zoomLevel = this._zoom - (e.deltaY * 20);
                this.zoom = Math.max(zoomLevel, 1);
            } else {
                this.moveTo({
                    x: this._center.x + e.deltaX * 2,
                    y: this._center.y + e.deltaY * 2,
                });
            }
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'r') {
                this.zoom = 1000;
                this.moveTo({
                    x: 0,
                    y: 0,
                });
            }
        });
    }
}
