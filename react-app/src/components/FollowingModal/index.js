import './FollowingModal.css';


const FollowingModal = ({ props }) => {
    const { 
        followers, 
        following, 
        isUserFollowing, 
        user,
        sessionUser,
        unfollowHandler,
        followHandler,
        setShowFollowModal
    } = props


    const displayFollowIcon = (sessionUser, user) => {
        return user !== sessionUser && !isUserFollowing
    };

    const displayUnfollowIcon = (sessionUser, user) => {
        return user !== sessionUser && isUserFollowing;
    };

    // const followHandler = () => {
    //     dispatch(follow(user.id))
    //         .then(() => dispatch(getFollowedPosts()))
    // };

    // const unfollowHandler = () => {
    //     dispatch(unfollow(user.id))
    //         .then(() => dispatch(removePosts(user.id)));
    //     setShowFollowModal(false);
    // };

    return (
        <div className='following-modal-container'>
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
            ))}
        </div>
    );
};

export default FollowingModal;