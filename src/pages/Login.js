// imports
import { useState } from 'react';
import { useUserContext } from '../hooks/useUserHook';

const Login = () => {

    // state from user input to be sent to API in request body
    const [ email, setEmail ] = useState(''); 
    const [ password, setPassword ] = useState('');

    // error and loading states
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    // get dispatch from user context
    const { dispatch } = useUserContext();

    // handle submit of login form
    const handleSubmit = async (e) => {

        e.preventDefault();

        // reset error and start loading
        setError(null);
        setIsLoading(true);

        // create request object using user input
        const requestObject = {
            email: email,
            password: password
        }

        // try to find user and match password
        try {
            const User = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestObject)
            })

            // convert to json (async)
            const userJson = await User.json();

            // if response is not OK...
            if(!User.ok){
                setError(userJson.message);
                setIsLoading(false);
            }

            // if response is OK...
            if(User.ok){
                // put token in browsers local storage
                localStorage.setItem('user', JSON.stringify(userJson));

                //update user context
                dispatch({ type: 'LOGIN', payload: userJson });
                setIsLoading(false);
            }
    
        } catch (error) {
            setError(error.message)
            setIsLoading(false);
        }

    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Log In</h3>
          
            <label>Email: </label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password: </label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

// exports
export default Login;