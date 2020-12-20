// Source:
// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
import { Vector } from '../../models/types';

function dist2(v: Vector, w: Vector) {
    return Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2);
}

function distToSegmentSquared(p: Vector, v: Vector, w: Vector) {
    const l2 = dist2(v, w);
    if (l2 === 0) {
        return dist2(p, v);
    }
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, {
        x: v.x + t * (w.x - v.x),
        y: v.y + t * (w.y - v.y),
    });
}

export function distanceToSegment(p: Vector, v: Vector, w: Vector) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
}
