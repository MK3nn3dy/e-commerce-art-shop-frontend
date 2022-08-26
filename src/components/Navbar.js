// imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import BasketIcon from './BasketIcon';

const Navbar = () => {

    const { user_id } = useContext(UserContext);

    return (
        <div className="navbar">
            
            <h1><Link to="/">Luisa Brito</Link></h1>
            
            { !user_id && (
            <nav className="login-signup">
                <p>Log In</p>
                <p>Sign Up</p>
            </nav>)}

            { user_id && (
            <nav className="login-signup">
                <p>Profile</p>
                <Link to="/basket"><BasketIcon /></Link>
                <p>Sign Out</p>
            </nav>)}

        </div>   
    )

}

export default Navbar;