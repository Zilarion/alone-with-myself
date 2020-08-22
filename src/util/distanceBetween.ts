import { Body } from "models/Body"

export function distanceBetween(b1: Body, b2: Body) {
    const a = Math.abs(b1.position.x - b2.position.x);
    const b = Math.abs(b1.position.y - b2.position.y);
    return Math.sqrt(a ** 2 + b ** 2);
}
