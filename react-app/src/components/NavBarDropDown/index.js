import './NavBarDropDown.css'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBarDropDown = ({ user }) => {

    return (
        <div className='navbar-dropdown-menu'>
            {/* <div className='navbar-dropdown-triangle-wrap'>
                <div className='navbar-dropdown-triangle'></div>
            </div> */}
            <div className='navbar-dropdown-list'>
                <NavLink to={`/users/${user.id}`} className='navbar-dropdown-profile-container'>
                    <i className="fa-regular fa-user user-profile-icon"></i>
                    Profile
                </NavLink>
                <div className='navbar-dropdown-logout-container'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
};

export default NavBarDropDown;