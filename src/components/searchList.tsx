import React, { useEffect, useState } from 'react';
import PaginatedList from './paginatedList';
import { Character } from '../types/types';
import { getCharacters } from '../services/api';
import { getIdFromSWAPIUrl } from '../utils/utils';

interface SearchListProps { }

const SearchList: React.FC<SearchListProps> = () => {
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [characters, setCharacters] = useState<Character[]>([])
    const [totalCharacters, setTotalCharacters] = useState<number>(0);
    const [searchField, setSearchField] = useState<string>("");

    const calcMaxPage = () => {
        return totalCharacters ? Math.ceil(totalCharacters / 10) : 1;
    };

    const handleSearchChange = (e:any) => {
        setSearchField(e.target.value);
    }

    let maxPage = calcMaxPage();

    useEffect(() => {
        let saveResults = true;

        const get = async () => {

            setIsLoading(true);
            const result = await getCharacters(currentPage, searchField);
            const characters = result.results;
            const count = result.count;

            for(let i = 0; i < characters?.length; i++){
                characters[i].id = getIdFromSWAPIUrl(characters[i].url);
            }
            
            if(saveResults){
                setCharacters(characters);
                setTotalCharacters(count);
                maxPage = calcMaxPage();
            }
            setIsLoading(false);
        }

        get();
        return () => {
            saveResults = false;
        }

    }, [currentPage, searchField]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchField]);

    return(
        <div className='searchList'>
            <div className='listHeader'>
                <h2>
                    Star Wars Characters
                </h2>
                <label className='searchList-searchLabel'>
                    Search: 
                    <input className='searchList-search' type='text' value={searchField} onChange={handleSearchChange}></input>
                </label>
            </div>
            <PaginatedList 
                currentPage={currentPage} 
                maxPage={maxPage} 
                setCurrentPage={setCurrentPage}
                isLoading={isLoading} 
                characters={characters} 
            ></PaginatedList>
        </div>
    )
}

export default SearchList;