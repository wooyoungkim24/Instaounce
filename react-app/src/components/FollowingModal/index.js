import './FollowingModal.css';
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../store/userPages';
import { getFollowedPosts, removePosts } from '../../store/posts';


const FollowingModal = ({ 
    following, 
    sessionUser, user, setShowFollowModal, setShowFollowingModal }) => {

    const dispatch = useDispatch();
    const isUserFollowing = user.followers[sessionUser.id];


    const displayFollowIcon = (sessionUser, user) => {
        return user !== sessionUser && !isUserFollowing
    };

    const displayUnfollowIcon = (sessionUser, user) => {
        return user !== sessionUser && isUserFollowing;
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
                    Following
                </div>
                <div className='following-modal-close' onClick={() => setShowFollowingModal(false)}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            {following.map(follow => (
                <div className='following-modal-card'>
                    <div className='following-modal-image-container'>
                        <img src={follow.profile_image} className='following-modal-profile-image' alt='profile pic' />
                    </div>
                    <div className='following-modal-name-container'>
                        <div className='following-modal-username'>
                            {follow.username}
                        </div>
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
                            <div onClick={() => unfollowHandler(follow.id)} className='profile-details-unfollow-button'>
                                <i className="fa-solid fa-user user-icon"></i>
                                <i className="fa-solid fa-check check-icon"></i>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FollowingModal;