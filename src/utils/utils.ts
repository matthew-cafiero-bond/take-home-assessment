/**
 * Format a number to its comma separated form
 * @param number - number to convert as a number or as a string
 * @returns - number as string, with commas
 */
export const formatToCommaSeparated = (number: number | string) => {
    let numString = number.toString();
    let counter = 0;
    for(let i = numString.length - 1; i > 0; i--){
        counter++;
        if(counter === 3){
            numString = numString.slice(0, i) + ',' + numString.slice(i);
            counter = 0;
        }
    }
    return numString;
}

/**
 * Check if an input can be parsed to a number, or already is one
 * @param input - value to check
 * @returns - true if input is a number or a string parsable to a number, false otherwise
 */
export const isParsableNumber = (input: any) => {
    return !Number.isNaN(parseFloat(input.toString()));
}


/**
 * Get an element id from a SWAPI url
 * @param url - SWAPI url endpoint
 * @returns - id of SWAPI element
 */
export const getIdFromSWAPIUrl = (url: string): number => {
    const split = url.split('/');
    return parseInt(split[5]);
}

