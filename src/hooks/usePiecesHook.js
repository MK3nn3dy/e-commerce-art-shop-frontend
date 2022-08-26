import { PiecesContext } from "../contexts/PiecesContext";
import { useContext } from "react";

export const usePiecesContext = () => {
    const context = useContext(PiecesContext);

    if(!context){
        throw Error('usePiecesContext must be used inside the PiecesContextProvider');
    }

    return context;
}
