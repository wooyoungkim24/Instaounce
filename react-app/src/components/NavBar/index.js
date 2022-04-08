import './NavBar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton'
import logo from '../../assets/logo.png'
import NavBarDropDown from '../NavBarDropDown';
import { Modal } from "../../context/modal"
import CreatePostModalForm from '../CreatePostModalForm';
import {SearchBar} from '../SearchBar/search'


const NavBar = ({ user }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const clickHandler = () => {
        showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)
    }
    const [showConfirm, setShowConfirm] = useState(false)
    const [finalPage, setFinalPage] = useState(false)
    const [firstPage, setFirstPage] = useState(true)
    const closeModals = () =>{
        setShowModal(false)
        setShowConfirm(false)
    }

    function conditionalSetShowConfirm() {
        if(firstPage){
            setShowModal(false)
        }
        else if(!finalPage){
            setShowConfirm(true)
        }
        else{
            setShowModal(false)
        }
    }
    
    return (
        <nav>
            <div className='navbar-container'>
                {showConfirm &&
                    <Modal onClose={() => setShowConfirm(false)}>
                        <div className="close-modal-confirm">
                            <div className="close-confirm-top">
                                <div className='discardPostDiv'>
                                    Discard post?
                                </div>
                                <div className='ifLeaveDiv'>
                                    If you leave, your edits won't be saved.
                                </div>
                            </div>
                            <div className="close-confirm-buttons">
                                <button id='discardButton' type='button' onClick={closeModals}>
                                    Discard
                                </button>
                                <button id = 'cancelDiscardButton' type='button' onClick={()=> setShowConfirm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                }
                <Link to="/">
                    <img src={logo} className="navbar-logo" alt='logo' />
                </Link>
                <div className="search-bar-nav">
                    <SearchBar />
                </div>
                <div className='navbar-right-container'>
                    <div className='navbar-icon-tray'>
                        <Link to='/'>
                            <i className="fa-solid fa-house-chimney"></i>
                        </Link>

                        <button id='create-post-button' type='button' onClick={() => setShowModal(true)}>
                            <i  className="fa-solid fa-square-plus"></i>
                        </button>


                        {showModal && (
                            <Modal onClose={conditionalSetShowConfirm}>
                                <CreatePostModalForm setFinalPage = {setFinalPage} setFirstPage = {setFirstPage}/>
                            </Modal>
                        )}

                        <Link to='/explore' >
                            <i className="fa-solid fa-compass"></i>
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
}

export default NavBar;
