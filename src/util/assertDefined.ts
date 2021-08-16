import { assert } from './assert';

export function assertDefined<T>(value: T | null | undefined): T {
    assert(value != null, 'Expected a defined value');
    return value;
}
