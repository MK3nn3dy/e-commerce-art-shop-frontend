// imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import BasketIcon from './BasketIcon';
import { useLogout } from '../hooks/useLogout';


const Navbar = () => {

    const { user_id, username } = useContext(UserContext);

    const { logout } = useLogout();
    
    const handleClick = (e) => {
        logout();
    }

    return (
        <div className="navbar">

            <div className="nav-container">
            
                <h1><Link to="/">Art Shop</Link></h1>
                
                { !user_id && (
                    <nav className="login-signup">
                        <p><Link className="nav-link" to="/login">Log In</Link></p>
                        <p><Link className="nav-link" to="/signup">Sign Up</Link></p>
                    </nav>
                )}

                { user_id && (
                    <nav className="login-signup">
                        <p className="hello">Hello, {username}!</p>
                        <Link className="nav-link" to="/profile"><p className="nav-link">Profile</p></Link>
                        <Link className="nav-link" to="/basket"><BasketIcon /></Link>
                        <p className="nav-link"onClick={handleClick}>Sign Out</p>
                    </nav>
                )}

            </div>
        </div>   
    )

}

export default Navbar;