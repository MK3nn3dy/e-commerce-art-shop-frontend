import { createContext, useEffect, useReducer } from "react";

// create context
export const UserContext = createContext();


// create pieces reducer named in useReducer below
export const userReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user_id: action.payload.user,
                basket_items: [],
                username: action.payload.username,
                email: action.payload.email,
                token: action.payload.token,
                address: action.payload.address
            }
        case 'LOGOUT':
            return {
                user_id: null,
                basket_items: [],
                username: null,
                email: null,
                token: null,
                address: null
            }
        case 'SET_BASKET':
            return {
                user_id: state.user_id,
                basket_items: action.payload,
                username: state.username,
                email: state.email,
                token: state.token,
                address: state.address
            }
        case 'SET_ADDRESS':
            return {
                user_id: state.user_id,
                basket_items: state.basket_items,
                username: state.username,
                email: state.email,
                token: state.token,
                address: action.payload
            }
        default:
            return state;
    }
}

// export the provider and pass in the dispatch and state
export const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, {
        user_id: null,
        email: null,
        username: null,
        basket_items: [],
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user){
            dispatch({ type: 'LOGIN', payload: user})
        }

    },[])

    console.log('User context state: ', state);

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}