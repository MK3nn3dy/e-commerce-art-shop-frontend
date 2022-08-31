// imports
import { useState } from 'react';
import { useUserContext } from '../hooks/useUserHook';

const Signup = () => {

    // state for user input to be submitted to API in request object
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ email, setEmail ] = useState(''); 
    const [ password, setPassword ] = useState('');

    // error and loading states
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    // get dispatch from user context
    const { dispatch, user_id } = useUserContext();

    // handle submit button on signup form
    const handleSubmit = async (e) => {

        e.preventDefault();

        // set is loading and reset error every submit
        setIsLoading(true);
        setError(null);

        // create request object from state
        const requestObject = {
            email: email,
            password: password,
            first: firstName,
            last: lastName,
            username: userName
        }

        // try to create a new user using pool
        try {
            const newUser = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestObject)
            })

            // convert response to json (async)
            const newUserJson = await newUser.json();

            // if response not OK...
            if(!newUser.ok){
                setError(newUserJson.message);
                setIsLoading(false); 
            }

            // if response OK...
            if(newUser.ok){
                // put token in browsers local storage
                localStorage.setItem('user', JSON.stringify(newUserJson));

                //update user context
                dispatch({ type: 'LOGIN', payload: newUserJson });
                setIsLoading(false);
            }
            
            console.log('Current user_id in state is: ', user_id);

        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }

    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>First Name: </label>
            <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Last Name: </label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>User Name: </label>
            <input 
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
            />
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
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

// exports
export default Signup;