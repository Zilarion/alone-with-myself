/**
 * Generates a random star name using the bayer designation.
 * https://en.wikipedia.org/wiki/Astronomical_naming_conventions#Bayer_designation
 */
export function randomStarName() {
    const ascension = (Math.random() * 9999).toFixed();
    const declination = (Math.random() * 9999).toFixed();
    return `J${ascension}-${declination}`;
}
