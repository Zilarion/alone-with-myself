export function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function randomInt(max: number) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}
