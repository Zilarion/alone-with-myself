import {
    assert,
    PrintTask,
} from 'src/internal';

export function printCapacity(
    capacity: number,
    {
        count,
        progress,
        durationPerItem,
    }: PrintTask,
) {
    assert(capacity >= 0, 'Cannot compute printinfo with negative capacity.');
    if (count === 0 || capacity === 0) {
        return {
            capacityLeft: capacity,
            numberFinished: 0,
            progress: 0,
            numberStarted: 0,
        };
    }

    const progressWasZero = progress === 0;
    const progressPlusCapacity = capacity + progress;
    const numberFinished = Math.min(
        Math.floor(progressPlusCapacity / durationPerItem),
        count,
    );
    const completedAll = count === numberFinished;

    const capacityUsed = numberFinished * durationPerItem - progress;
    const capacityLeft = capacity - capacityUsed;

    const numberStarted = numberFinished + (progressWasZero ? 1 : 0) + (completedAll ? -1 : 0);

    return {
        capacityLeft: completedAll ? capacityLeft : 0,
        progress: completedAll ? 0 : capacityLeft,
        numberFinished,
        numberStarted,
    };
}
