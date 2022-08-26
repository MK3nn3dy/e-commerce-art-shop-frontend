import { createContext, useReducer } from "react";

// create context
export const UserContext = createContext();


// create pieces reducer named in useReducer below
export const userReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user_id: action.payload,
                basket_items: []
            }
        case 'LOGOUT':
            return {
                user_id: null,
                basket_items: []
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
        user_id: null,
        basket_items: []
    })


    console.log('User context state: ', state);

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}