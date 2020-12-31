import {
    InteractionPoint,
    Vector,
} from '../internal';

export class HeadquarterPoint extends InteractionPoint {
    constructor(position: Vector) {
        super({ position });
    }

    public update(_delta: number) {}
    public drawUpdate(_delta: number) {}
}
