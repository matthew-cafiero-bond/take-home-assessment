export interface Character {
    name: string,
    height: string,
    mass: string,
    birth_year: string,
    films: string[]
    homeworld: string,
    homeworldObj?: Homeworld,
    image?: Image, 
    url: string
    id: number
}

export interface Homeworld {
    name: string,
    terrain: string,
    climate: string,
    population: string
}

export interface Image {
    id: string,
    download_url: string,
    url: string
}

export interface PaginatedData {
    count: number,
    next: string,
    previous: string,
    results: any[]
}

export interface PaginatedApiResponse extends PaginatedData {
    results: Character[]
}

