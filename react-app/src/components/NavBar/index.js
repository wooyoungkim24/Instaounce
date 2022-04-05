import './NavBar.css'
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import logo from '../../assets/logo.png'
import NavBarDropDown from '../NavBarDropDown';

const NavBar = ({ user }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const clickHandler = () => {
        showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)
    }

    return (
        <nav>
            <div className='navbar-container'>
                <Link to="/">
                    <img src={logo} className="navbar-logo" alt='logo' />
                </Link>
                <div className='navbar-right-container'>
                    <div className='navbar-icon-tray'>
                        <Link to='/' exact={true}>
                            <i class="fa-solid fa-house-chimney"></i>
                        </Link>
                        <Link to='/explore' exact={true}>
                            <i class="fa-solid fa-compass"></i>
                        </Link>
                    </div>
                    <div className='navbar-dropdown-container'>
                        <img
                            src={user.profile_image}
                            className='navbar-profile-photo'
                            onClick={clickHandler}
                            alt='profile pic' />
                        {showDropDown &&
                            <NavBarDropDown />
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' exact={true} activeClassName='active'>
                        Users
                    </NavLink>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

