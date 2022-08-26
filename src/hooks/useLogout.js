import { useUserContext } from "./useUserHook";

export const useLogout = () => {

    const { dispatch } = useUserContext();

    const logout = () => {
        // remove token from local storage in browser
        localStorage.removeItem('user');

        // dispatch logout action to user context reducer
        dispatch({ type: 'LOGOUT'});
    }

    return { logout }

}