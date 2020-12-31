import { ResourceType } from '../internal';
import { divideResources } from './divideResources';

describe('util: divideResources', () => {
    it('should return 0 if an empty set is provided as denominator', () => {
        expect(divideResources([], [])).toEqual(0);

        expect(
            divideResources([ {
                amount: 10,
                type: ResourceType.minerals,
            } ], []),
        ).toEqual(0);
    });

    it('should be correct if the same resources are passed', () => {
        expect(divideResources([ {
            amount: 10,
            type: ResourceType.minerals,
        } ], [ {
            amount: 10,
            type: ResourceType.minerals,
        } ])).toEqual(1);
    });

    it('should be correct if the denominator has additional resources', () => {
        expect(divideResources([ {
            amount: 10,
            type: ResourceType.minerals,
        } ], [ {
            amount: 100,
            type: ResourceType.minerals,
        } ])).toEqual(10);

        expect(divideResources([ {
            amount: 10,
            type: ResourceType.minerals,
        } ], [ {
            amount: 66,
            type: ResourceType.minerals,
        } ])).toEqual(6.6);
    });

    it('should be correct if the numerator has additional resources', () => {
        expect(divideResources([ {
            amount: 100,
            type: ResourceType.minerals,
        } ], [ {
            amount: 10,
            type: ResourceType.minerals,
        } ])).toEqual(0.1);
    });

    it('should be correct if the numerator has additional resources', () => {
        expect(divideResources([ {
            amount: 100,
            type: ResourceType.minerals,
        }, {
            amount: 100,
            type: ResourceType.alloys,
        } ], [ {
            amount: 10,
            type: ResourceType.minerals,
        } ])).toEqual(0);
    });

    it('should be correct if both have multiples of resources', () => {
        expect(divideResources([ {
            amount: 100,
            type: ResourceType.minerals,
        }, {
            amount: 100,
            type: ResourceType.alloys,
        } ], [ {
            amount: 10,
            type: ResourceType.minerals,
        }, {
            amount: 50,
            type: ResourceType.alloys,
        } ])).toEqual(0.1);
    });
})
;
