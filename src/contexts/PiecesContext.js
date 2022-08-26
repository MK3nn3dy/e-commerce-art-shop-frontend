import { createContext, useReducer } from "react";

// create context
export const PiecesContext = createContext();


// create pieces reducer named in useReducer below
export const piecesReducer = (state, action) => {
    switch(action.type){
        case 'SET_PIECES':
            return {
                pieces: action.payload
            }
        default:
            return state;
    }
}

// export the provider and pass in the dispatch and state
export const PiecesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(piecesReducer, {
        pieces: null
    })

    return (
        <PiecesContext.Provider value={{...state, dispatch}}>
            { children }
        </PiecesContext.Provider>
    )
}