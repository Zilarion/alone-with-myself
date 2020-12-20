import { InteractionPoint } from '../drawables/InteractionPoint';
import { Vector } from './types';

export class HeadquarterPoint extends InteractionPoint {
    constructor(location: Vector) {
        super({ location });
    }

    public update() {

    }
}
