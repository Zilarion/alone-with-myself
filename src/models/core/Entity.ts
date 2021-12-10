export enum EntityType {
    System = 'system',
    Printable = 'printable',
    Transporter = 'transporter',
}

export abstract class Entity {
    protected abstract _type: EntityType;

    get type(): EntityType {
        return this._type;
    }

    get children(): Entity[] {
        return [];
    }

    abstract update(delta: number): void;
}
