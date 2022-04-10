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
                <div className='navbar-dropdown-profile-container'>
                    <NavLink to={`/users/${user.id}`} >
                        <i class="fa-regular fa-user user-profile-icon"></i>
                        Profile
                    </NavLink>
                </div>
                <div className='navbar-dropdown-logout-container'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
};

export default NavBarDropDown;