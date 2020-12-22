import {
    InteractionPoint,
    Vector,
} from '../internal';

export class HeadquarterPoint extends InteractionPoint {
    constructor(location: Vector) {
        super({ location });
    }

    public update(_delta: number) {}
    public drawUpdate(_delta: number) {}
}
