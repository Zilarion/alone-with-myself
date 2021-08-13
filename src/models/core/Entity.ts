export enum EntityType {
    System,
    Printable,
    Transporter,
}

export abstract class Entity {
    protected abstract _type: EntityType;

    public get type(): EntityType {
        return this._type;
    }

    public get children(): Entity[] {
        return [];
    }

    public abstract update(delta: number): void;
}
