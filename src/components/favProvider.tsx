import { createContext, useState } from "react";
import { Character } from "../types/types";

interface FavContextType {
    favorites: Character[],
    setFavorites: (favorites: Character[]) => void
}

interface FavProviderProps { 
    children: React.ReactNode
}

export const FavContext = createContext<FavContextType>({ favorites: [], setFavorites: () => {} });

const FavProvider: React.FC<FavProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Character[]>([]);

    return (
        <FavContext.Provider value={{favorites, setFavorites}}>
            {children}
        </FavContext.Provider>
    )
}

export default FavProvider;