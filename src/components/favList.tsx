import React, { useContext, useEffect, useState } from 'react';
import PaginatedList from './paginatedList';
import { Character } from '../types/types';
import { FavContext } from './favProvider';

interface FavListProps { }

const FavList: React.FC<FavListProps> = () => {

    const calcMaxPage = () => {
        return favorites.length ? Math.ceil(favorites.length / itemsPerPage) : 1;
    };

    const { favorites } = useContext(FavContext);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage = 3;
    const maxPage = favorites.length ? Math.ceil(favorites.length / itemsPerPage) : 1;
    const minIndex = currentPage * itemsPerPage - itemsPerPage; 
    const maxIndex = currentPage * itemsPerPage; 
    const displayedCharacters: Character[] = favorites.slice(minIndex, maxIndex);

    useEffect(() => {
        if(currentPage > calcMaxPage()){
            setCurrentPage(calcMaxPage());
        }
    }, [favorites]);

    return(
        <div className="favList">
            <div className="listHeader">
                <h2>Favorites</h2>
            </div>
            <PaginatedList 
                currentPage={currentPage} 
                maxPage={maxPage} 
                setCurrentPage={setCurrentPage}
                isLoading={false} 
                characters={displayedCharacters} 
            ></PaginatedList>
        </div>
    )
}

export default FavList;