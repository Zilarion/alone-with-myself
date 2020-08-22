import { Body } from "models/Body";
import { distanceBetween } from "./distanceBetween";

const GRAVITATIONAL_CONSTANT = 6.67408e-11;

export function gravitationalForceBetween(b1: Body, b2: Body) {
    const distance = distanceBetween(b1, b2);
    return GRAVITATIONAL_CONSTANT * (b1.mass * b2.mass) / (distance ** 2);
}
