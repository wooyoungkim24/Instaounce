import './UserProfileDetails.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../store/userPages';


const UserProfileDetails = ({ user, sessionUser }) => {

    const dispatch = useDispatch();

    const posts = Object.values(user.posts);
    const followers = Object.values(user.followers);
    const following = Object.values(user.following);
    const isUsersPage = user.id === sessionUser.id;
    const isUserFollowing = user.followers[sessionUser.id];


    const displayFollowIcon = () => {
        return !isUsersPage && !isUserFollowing
    };

    const displayUnfollowIcon = () => {
        return !isUsersPage && isUserFollowing
    };

    const followHandler = () => {
        dispatch(follow(user.id));
    };


    return (
        <div className="profile-details-container">
            <div className='profile-details-image-container'>
                <img src={user.profileImage} alt='profile pic' className='profile-details-image' />
            </div>
            <div className='profile-details-text-container'>
                <div className='profile-details-top-container'>
                    <div className='profile-details-username'>
                        {user.username}
                    </div>
                    {displayFollowIcon() &&
                        <div onClick={followHandler} className='profile-details-follow-button'>
                            <span>Follow</span>
                        </div>
                    }
                    {displayUnfollowIcon() &&
                        <div className='profile-details-unfollow-button'>
                            <i class="fa-solid fa-user user-icon"></i>
                            <i class="fa-solid fa-check check-icon"></i>
                        </div>
                    }
                </div>
                <div className='profile-details-user-stats'>
                    <div className='profile-user-stats-container'>
                        <span className='profile-user-stat'>{posts.length}</span> posts
                    </div>
                    <div className='profile-user-stats-container'>
                        <span className='profile-user-stat'>{followers.length}</span> followers
                    </div>
                    <div className='profile-user-stats-container'>
                        <span className='profile-user-stat'>{following.length}</span> following
                    </div>
                </div>
                <div className='profile-user-bio'>
                    {user.bio}
                </div>
            </div>
        </div>
    )
};

export default UserProfileDetails;