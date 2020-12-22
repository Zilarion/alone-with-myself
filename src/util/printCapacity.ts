import {
    assert,
    PrintTask,
} from '../internal';

export function printCapacity(
    capacity: number,
    {
        maxAffordable,
        count,
        progress,
        durationPerItem,
    }: PrintTask,
) {
    assert(capacity >= 0, 'Cannot compute printinfo with negative capacity.');
    if (maxAffordable === 0 || count === 0 || capacity === 0) {
        return {
            capacityLeft: capacity,
            numberFinished: 0,
            progress: 0,
            numberStarted: 0,
        };
    }

    const progressWasZero = progress === 0;
    const progressPlusCapacity = capacity + progress;
    const maxPrinted = Math.min(
        Math.floor(progressPlusCapacity / durationPerItem),
        count,
    );
    const numberFinished = Math.min(maxPrinted, maxAffordable);
    const completedAll = count === numberFinished || maxAffordable === numberFinished;

    const capacityUsed = numberFinished * durationPerItem;
    const capacityLeft = capacity - capacityUsed;

    const numberStarted = Math.min(
        count,
        maxAffordable,
        progressWasZero ? numberFinished + 1 : numberFinished,
    );

    return {
        capacityLeft: completedAll ? capacityLeft : 0,
        progress: completedAll ? 0 : capacityLeft,
        numberFinished,
        numberStarted,
    };
}
