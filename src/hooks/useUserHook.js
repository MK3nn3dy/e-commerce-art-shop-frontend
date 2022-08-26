import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext);

    if(!context){
        throw Error('useUserContext must be used inside the UserContextProvider');
    }

    return context;
}
