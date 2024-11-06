import React from 'react';
import { Character } from '../types/types';
import Card from './card';

interface PaginatedListProps { 
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    maxPage: number,
    isLoading: boolean,
    characters: Character[] | undefined,
}

const PaginatedList: React.FC<PaginatedListProps> = ({ currentPage, setCurrentPage, maxPage, isLoading, characters }) => {

    const handleIncrement = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleDecrement = () => {
        setCurrentPage(currentPage - 1);
    }

    //TODO: figure out why this css set up works, because I don't like it
    return(
        <div className='paginatedList-container'>
            <div className="paginatedList">
                <div className="paginatedList-List">
                    {characters?.length ? characters?.map(c => <Card key={c.id} character={c}></Card>) : <p>No Characters Found</p>}
                </div>
            </div>
            <div className="paginatedList-pageChangeFooter">
                <div className="paginatedList-pageChanger">
                    <button className="paginatedList-pageChangeButton" onClick={handleDecrement} disabled={currentPage<=1}>Prev Page</button>
                    <p> {currentPage} / {maxPage || 1}</p>
                    <button className="paginatedList-pageChangeButton" onClick={handleIncrement} disabled={currentPage>=maxPage}>Next Page</button>
                </div>
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    )

}

export default PaginatedList;