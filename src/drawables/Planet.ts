import {
    Body,
    BodyProps,
    ManufacturerPoint,
} from '../internal';

export class Planet extends Body {
    constructor(props: BodyProps) {
        super(props);

        this._points.push(
            new ManufacturerPoint({ parent: this }),
        );
    }
}
