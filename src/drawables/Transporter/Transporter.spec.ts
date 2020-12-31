import {
    EntityType,
    HeadquarterPoint,
    ResourcePoint,
    ResourceType,
    Transporter,
} from '../../internal';

describe('model: Transporter', () => {
    let transporter: Transporter;
    let from: ResourcePoint;
    let to: HeadquarterPoint;
    beforeEach(() => {
        from = new ResourcePoint({
            location: {
                x: 10,
                y: 10,
            },
            resources: [],
        });
        to = new HeadquarterPoint({
            x: 0,
            y: 0,
        });
        transporter = new Transporter(from, to);
    });

    it('should initialize correctly', () => {
        expect(transporter.from).toEqual(from);
        expect(transporter.to).toEqual(to);
        expect(transporter.type).toEqual(EntityType.Transporter);
        expect(transporter.speed).toEqual([]);
    });

    it('should set new speed values correctly', () => {
        expect(transporter.speed).toEqual([]);
        transporter.setSpeedPerSecond(ResourceType.minerals, 10);
        expect(transporter.speed).toEqual([ {
            type: ResourceType.minerals,
            amount: 10,
        } ]);
        expect(transporter.speedOf(ResourceType.minerals)).toEqual(10);
    });

    it('should update speed values correctly', () => {
        transporter.setSpeedPerSecond(ResourceType.minerals, 10);
        transporter.setSpeedPerSecond(ResourceType.minerals, 66);
        expect(transporter.speed).toEqual([ {
            type: ResourceType.minerals,
            amount: 66,
        } ]);
        expect(transporter.speedOf(ResourceType.minerals)).toEqual(66);
    });

    it('should return 0 for non transported resources', () => {
        expect(transporter.speedOf(ResourceType.minerals)).toEqual(0);
        expect(transporter.speedOf(ResourceType.power)).toEqual(0);
    });

    it('should not update interaction point storage when speed is not set', () => {
        from.storage.increment([ {
            type: ResourceType.minerals,
            amount: 100,
        } ]);
        transporter.update(500);
        expect(from.storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(to.storage.numberOf(ResourceType.minerals)).toEqual(0);
    });

    it('should not move anything when speed is higher then storage', () => {
        from.storage.increment([ {
            type: ResourceType.minerals,
            amount: 100,
        } ]);
        transporter.setSpeedPerSecond(ResourceType.minerals, 10000);
        transporter.update(500);
        expect(from.storage.numberOf(ResourceType.minerals)).toEqual(100);
        expect(to.storage.numberOf(ResourceType.minerals)).toEqual(0);
    });

    it('should update point storage according to speed', () => {
        from.storage.increment([ {
            type: ResourceType.minerals,
            amount: 100,
        } ]);
        transporter.setSpeedPerSecond(ResourceType.minerals, 100);
        transporter.update(500);
        expect(from.storage.numberOf(ResourceType.minerals)).toEqual(50);
        expect(to.storage.numberOf(ResourceType.minerals)).toEqual(50);
    });
});
