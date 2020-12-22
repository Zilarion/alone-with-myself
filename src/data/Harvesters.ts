import {
    assert,
    HarvesterProps,
    HarvesterSchema,
    PrintableType,
    ResourceType,
} from '../internal';

const HARVESTER_SCHEMAS = new Map<PrintableType, HarvesterSchema>([
    [
        PrintableType.miner,
        {
            produces: [
                {
                    type: ResourceType.minerals,
                    amount: 0.01,
                },
            ],
        },
    ],
]);

const harvesters = new Map<PrintableType, HarvesterProps>();

Array.from(HARVESTER_SCHEMAS.entries()).forEach(([ type, properties ]) => {
    harvesters.set(type, {
        type,
        ... properties,
    });
});


export function findHarvesterSchema(type: PrintableType): HarvesterProps {
    const harvester = harvesters.get(type);
    assert(harvester != null, `Could not find harvester ${type}`);

    return harvester;
}
