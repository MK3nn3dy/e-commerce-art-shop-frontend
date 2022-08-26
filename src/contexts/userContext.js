import { createContext, useReducer } from "react";

// create context
export const UserContext = createContext();


// create pieces reducer named in useReducer below
export const userReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user_id: action.payload
            }
        case 'LOGOUT':
            return {
                user_id: null
            }
        case 'SET_BASKET':
            return {
                user_id: state.user_id,
                basket_items: action.payload
            }
        default:
            return state;
    }
}

// export the provider and pass in the dispatch and state
export const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, {
        user_id: 1,
        basket_items: []
    })

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}