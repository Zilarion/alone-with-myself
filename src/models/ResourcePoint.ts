import {
    InteractionPoint,
    InteractionPointProps,
} from './InteractionPoint';

type ResourcePointProps = {
    resources: number;
} & InteractionPointProps;

export class ResourcePoint extends InteractionPoint {
    private _resources: number;

    constructor(props: ResourcePointProps) {
        super(props);
        this._resources = props.resources;
    }

    public get resources() {
        return this._resources;
    }
}
