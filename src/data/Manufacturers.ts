import {
    assert,
    ManufacturerProps,
    ManufacturerSchema,
    PrintableType,
    ResourceType,
} from '../internal';

const MANUFACTURER_SCHEMAS = new Map<PrintableType, ManufacturerSchema>([
    [
        PrintableType.foundry,
        {
            produces: [
                {
                    type: ResourceType.alloys,
                    amount: 0.01,
                },
            ],
            consumes: [
                {
                    type: ResourceType.minerals,
                    amount: 0.1,
                },
            ],
        },
    ],
]);

const manufacturers = new Map<PrintableType, ManufacturerProps>();

Array.from(MANUFACTURER_SCHEMAS.entries()).forEach(([ type, properties ]) => {
    manufacturers.set(type, {
        type,
        ... properties,
    });
});


export function findManufacturerSchema(type: PrintableType): ManufacturerProps {
    const manufacturer = manufacturers.get(type);
    assert(manufacturer != null, `Could not find manufacturer ${type}`);

    return manufacturer;
}
