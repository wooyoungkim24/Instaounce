import './FollowingModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../../store/userPages';
import { getFollowedPosts, removePosts } from '../../store/posts';
import { useState } from 'react';
import { Modal } from '../../context/modal';
import { Link } from 'react-router-dom';


const FollowingModal = ({ following, sessionUser, setShowFollowingModal, modalHeader }) => {

    const [showFollowModal, setShowFollowModal] = useState(false);
    const [followModalContent, setFollowModalContent] = useState('');
    const dispatch = useDispatch();

    const currentUserFollowing = useSelector(state => state.pageState[sessionUser.id].following);



    const displayFollowIcon = (sessionUser, user) => {
        // console.log(currentUserFollowing[user])
        return user !== sessionUser && !currentUserFollowing[user]
    };

    const displayUnfollowIcon = (sessionUser, user) => {
        return user !== sessionUser && currentUserFollowing[user]
    };

    const followHandler = (userId) => {
        dispatch(follow(userId))
            .then(() => dispatch(getFollowedPosts()))
    };

    const unfollowHandler = (userId) => {
        dispatch(unfollow(userId))
            .then(() => dispatch(removePosts(userId)));
        setShowFollowModal(false);
    };

    return (
        <div className='following-modal-container'>
            <div className='following-modal-following-tag-wrapper'>
                <div className='following-modal-following-tag'>
                    {modalHeader}
                </div>
                <div className='following-modal-close' onClick={() => setShowFollowingModal(false)}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            {following.map(follow => (
                <div className='following-modal-card'>
                    <Link to={`/users/${follow.id}`} onClick={() => setShowFollowingModal(false)}>
                        <div className='following-modal-image-container'>
                            <img src={follow.profile_image} className='following-modal-profile-image' alt='profile pic' />
                        </div>
                    </Link>
                    <div className='following-modal-name-container'>
                        <Link to={`/users/${follow.id}`} onClick={() => setShowFollowingModal(false)} >
                            <div className='following-modal-username'>
                                {follow.username}
                            </div>
                        </Link>
                        <div className='following-modal-full-name'>
                            {follow.first_name} {follow.last_name}
                        </div>
                    </div>
                    <div>
                        {displayFollowIcon(sessionUser.id, follow.id) &&
                            <div onClick={() => followHandler(follow.id)} className='profile-details-follow-button'>
                                <span>Follow</span>
                            </div>
                        }
                        {displayUnfollowIcon(sessionUser.id, follow.id) &&
                            <div onClick={() => {
                                setShowFollowModal(true);
                                setFollowModalContent(follow);
                            }}
                                className='following-modal-unfollow-button'>
                                Following
                            </div>
                        }
                    </div>
                    {showFollowModal &&

                        <Modal onClose={() => {
                            setShowFollowModal(false);
                            setFollowModalContent('')
                        }}>
                            <div className="profile-user-unfollow-modal">
                                <div className="close-confirm-top">
                                    <div className='profile-details-modal-image-container'>
                                        <img src={followModalContent.profile_image} alt='profile pic' className='profile-details-image-modal' />
                                    </div>
                                    <div className='profile-details-modal-username-container'>
                                        Unfollow @{followModalContent.username}?
                                    </div>
                                </div>
                                <div className="close-confirm-buttons">
                                    <button id='discardButton' type='button' onClick={() => unfollowHandler(followModalContent.id)}>
                                        Unfollow
                                    </button>
                                    <button id='cancelDiscardButton' type='button' onClick={() => setShowFollowModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    }
                </div>
            ))}
        </div>
    );
};

export default FollowingModal;