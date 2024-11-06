import React, { useContext, useEffect, useState } from 'react';
import { Character, Image } from '../types/types';
import Modal from './modal';
import { FavContext } from './favProvider';
import { getImageById } from '../services/api';

interface CardProps { 
    character: Character
}

const Card: React.FC<CardProps> = ({ character }) => {
    const {favorites, setFavorites} = useContext(FavContext);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [image, setImage] = useState<Image|undefined>(character?.image);

    const updateFavorites = (c: Character): void => {
        const index = favorites.findIndex(fav => fav.id === c.id);
        if(index === -1){
            setFavorites([...favorites, c]);
        } else {
            favorites.splice(index, 1);
            setFavorites([...favorites]);
        }
    }

	const isFavorite = (c: Character): boolean => {
        return favorites.findIndex(fav => fav.id === c.id) !== -1;
    }

    const handleFavClick = () => {
        updateFavorites(character);
    }

    const handleModalClick = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        const getImage = async () => {
            const foundImage = await getImageById(character.id);
            character.image = foundImage;
            setImage(foundImage);
        }

        if(!character?.image){
            getImage();
        }
    }, []);

    return(
        <div className='card'>
            {modalOpen && <Modal character={character} handleModalClose={handleModalClose}></Modal>}
            <button className='card-mainButton' onClick={handleModalClick}>
                <img src={image?.download_url} className='card-image'></img>
                <p>{character.name}</p>
            </button>
            <button className='card-favButton' onClick={handleFavClick}> {isFavorite(character) ? `Unfav` : `Fav`} </button>
        </div>
    )
}

export default Card;