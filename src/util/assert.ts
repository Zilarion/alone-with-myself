
class AssertError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AssertError';
    }
}

export function assert(condition: boolean, message: string): asserts condition {
    if (condition) {
        return;
    }
    throw new AssertError(`Assert: ${message}`);
}
