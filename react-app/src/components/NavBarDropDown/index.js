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
                <div>
                    <NavLink to={`/users/${user.id}`} >
                        Profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/users' activeClassName='active'>
                        Users
                    </NavLink>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
};

export default NavBarDropDown;