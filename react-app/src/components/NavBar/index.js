import './NavBar.css'
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import logo from '../../assets/logo.png'
import NavBarDropDown from '../NavBarDropDown';
import {Modal} from "../../context/modal"
import CreatePostModalForm from '../CreatePostModalForm';

const NavBar = ({ user }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const clickHandler = () => {
        showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)
    }

    console.log('where is my modal', showModal)
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

                        <button type ='button' onClick={() => setShowModal(true)}>
                            <i id='create-post-button' class="fa-solid fa-square-plus"></i>
                        </button>


                        {showModal &&(
                            <Modal onClose={()=> setShowModal(false)}>
                                <CreatePostModalForm />
                            </Modal>
                        )}

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
                            <NavBarDropDown user={user} />
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
