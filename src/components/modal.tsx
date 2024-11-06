import React, { useEffect, useState } from 'react';
import { Character, Homeworld } from '../types/types';
import { getPlanetByID } from '../services/api';
import Info from './info';
import { formatToCommaSeparated, getIdFromSWAPIUrl, isParsableNumber } from '../utils/utils';
import { createPortal } from 'react-dom';

interface ModalProps { 
    character: Character,
    handleModalClose: () => void
}

const Modal: React.FC<ModalProps> = ({ character, handleModalClose }) => {
    const [homeworld, setHomeworld] = useState<Homeworld|undefined>(character?.homeworldObj ?? undefined);

    useEffect(() => {
        const getHomeworld = async () => {
            const homeworldId = getIdFromSWAPIUrl(character.homeworld);
            const homeworldResponse:Homeworld = await getPlanetByID(homeworldId);
            setHomeworld(homeworldResponse);
            character.homeworldObj = homeworldResponse;
        }

        if(homeworld === undefined){
            getHomeworld();
        }
    }, []);

    const preventOverlayClick = (e:any) => {
        e.stopPropagation();
    }

    const handleOverlayClick = () => {
        handleModalClose();
    }

    return(
        <div>
            {createPortal(
                <div className='modal-overlay' onClick={handleOverlayClick}>
                    <div className='modal' onClick={preventOverlayClick}>
                        <div className='modal-characterInfo'>
                            <h2>{character.name}</h2>
                            <Info label="Height: " value={character?.height ? `${parseFloat(character.height) / 100} m`: undefined}></Info>
                            <Info label="Mass: " value={character?.mass ? `${character.mass} kg`: undefined}></Info>
                            <Info label="Birth Year: " value={character?.birth_year ? character.birth_year : undefined}></Info>
                            <Info label="# of Film Appearances: " value={character?.films ? `${character.films.length}`: undefined}></Info>
                        </div>
                        <div className='modal-homeworldInfo'>
                            <h4>Homeworld Information:</h4>
                            <Info label="Name: " value={homeworld?.name}></Info>
                            <Info label="Terrain: " value={homeworld?.terrain}></Info>
                            <Info label="Climate: " value={homeworld?.climate}></Info>
                            <Info label="Population: " value={
                                homeworld?.population && isParsableNumber(homeworld?.population) 
                                ? formatToCommaSeparated(homeworld.population) 
                                : homeworld?.population
                            }></Info>
                        </div>
                        <div className='modal-footer'>
                            <button className='modal-closeButton' onClick={handleModalClose}>Close</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>

        
    )
}

export default Modal;