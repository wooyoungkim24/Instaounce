import './UserProfileDetails.css';
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../store/userPages';
import { Modal } from '../../context/modal';
import { useState } from 'react';
import { getFollowedPosts } from '../../store/posts';
import { removePosts } from '../../store/posts';
import FollowingModal from '../FollowingModal';


const UserProfileDetails = ({ user, sessionUser }) => {

    const dispatch = useDispatch();

    const posts = Object.values(user.posts);
    const followers = Object.values(user.followers);
    const following = Object.values(user.following);
    const isUsersPage = user.id === sessionUser.id;
    const isUserFollowing = user.followers[sessionUser.id];
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [showFollowersModal, setShowFollowersModal] = useState(false)
    const [showFollowingModal, setShowFollowingModal] = useState(false)


    const displayFollowIcon = () => {
        return !isUsersPage && !isUserFollowing
    };

    const displayUnfollowIcon = () => {
        return !isUsersPage && isUserFollowing;
    };

    const followHandler = () => {
        dispatch(follow(user.id))
        .then(() => dispatch(getFollowedPosts()))
    };

    const unfollowHandler = () => {
        dispatch(unfollow(user.id))
        .then(() => dispatch(removePosts(user.id)));
        setShowFollowModal(false);
    };


    return (
        <>
            <div className="profile-details-container">
                <div className='profile-details-image-container'>
                    <img src={user.profileImage} alt='profile pic' className='profile-details-image' />
                </div>
                <div className='profile-details-text-container'>
                    <div className='profile-details-top-container'>
                        <div className='profile-details-username'>
                            {user.username}
                        </div>
                        <div className='profile-details-follow-icons-tray'>
                            {displayFollowIcon() &&
                                <div onClick={followHandler} className='profile-details-follow-button'>
                                    <span>Follow</span>
                                </div>
                            }
                            {displayUnfollowIcon() &&
                                <div onClick={() => setShowFollowModal(true)} className='profile-details-unfollow-button'>
                                    <i className="fa-solid fa-user user-icon"></i>
                                    <i className="fa-solid fa-check check-icon"></i>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='profile-details-user-stats'>
                        <div className='profile-user-stats-container'>
                            <span className='profile-user-stat'>{posts.length}</span> posts
                        </div>
                        <div className='profile-user-stats-container'>
                            <span className='profile-user-stat'>{followers.length}</span> followers
                        </div>
                        <div onClick={() => setShowFollowingModal(true)} className='profile-user-stats-container'>
                            <span className='profile-user-stat'>{following.length}</span> following
                        </div>
                    </div>
                    <div className='profile-user-bio'>
                        {user.bio}
                    </div>
                </div>
            </div>
            {showFollowModal &&

                <Modal onClose={() => setShowFollowModal(false)}>
                    <div className="profile-user-unfollow-modal">
                        <div className="close-confirm-top">
                            <div className='profile-details-modal-image-container'>
                                <img src={user.profileImage} alt='profile pic' className='profile-details-image-modal' />
                            </div>
                            <div className='profile-details-modal-username-container'>
                                Unfollow @{user.username}?
                            </div>
                        </div>
                        <div className="close-confirm-buttons">
                            <button id='discardButton' type='button' onClick={unfollowHandler}>
                                Unfollow
                            </button>
                            <button id='cancelDiscardButton' type='button' onClick={() => setShowFollowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            }

            {showFollowingModal &&
                <Modal onClose={() => setShowFollowingModal(false)}>
                    <FollowingModal 
                    following={following} 
                    sessionUser={sessionUser} 
                    user={user}
                    setShowFollowModal={setShowFollowModal}
                    setShowFollowingModal={setShowFollowingModal}
                    />
                </Modal>
            }
        </>
    )
};

export default UserProfileDetails;