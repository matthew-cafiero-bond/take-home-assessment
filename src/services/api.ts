import { Homeworld, Image, PaginatedApiResponse } from "../types/types";

const swapiURL: string = 'https://swapi.dev/api/';

/**
 * Make a basic get request
 * @param url - api endpoint to request
 * @returns - promise of api response as json, or undefined if api recieves error
 */
const get = async (url: string): Promise<any> => {
    try {
        const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const body = await res.json();
        return body;
    } catch(error) {
        console.log(`Get request to "${url}" failed with error: `, error);
        return undefined;
    }
}

/**
 * Get paginated characters response from SWAPI api by searching/page
 * @param pageNumber - page to request
 * @param searchQuery - (Optional) partial or full name search for characters
 * @returns - JSON representing the page of data and relevant metadata
 */
export const getCharacters = async (pageNumber: number, searchQuery: string = ""): Promise<PaginatedApiResponse> => {
    const url = `${swapiURL}people/?page=${pageNumber}&search=${searchQuery}`;
    const charactersResponse: PaginatedApiResponse = await get(url);
    return charactersResponse;
}


/**
 * Get a planet from SWAPI by id
 * @param id - homeworld id for SWAPI
 * @returns - homeworld object from api endpoint
 */
export const getPlanetByID = async (id: number): Promise<Homeworld> => {
    const url = `${swapiURL}planets/${id}/`;
    const homeworldResponse = await get(url);
    return homeworldResponse;
}

/**
 * Get an image from PICSUM by id
 * @param id - id of image to get
 * @returns - A promise of an image object
 */
export const getImageById = async (id: number): Promise<Image> => {
    const url = `https://picsum.photos/id/${id}/info`;
    const image: Image = await get(url);
    return image;
}
