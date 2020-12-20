import { Body } from '../Body';

export interface Orbit {
    radius: number;
    focus: Body;
    velocity: number;
    angle: number;
}
