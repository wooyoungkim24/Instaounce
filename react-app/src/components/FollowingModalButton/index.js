import './FollowingModalButton.css'
import { useDispatch } from 'react-redux';
import { follow, unfollow } from '../../store/userPages';
import { getFollowedPosts, removePosts } from '../../store/posts';


const FollowingModalButton = () => {
    const dispatch = useDispatch();

    const displayFollowIcon = (sessionUser, user) => {
        return user !== sessionUser && !isUserFollowing
    };

    const displayUnfollowIcon = (sessionUser, user) => {
        return user !== sessionUser && isUserFollowing;
    };

    return (

    )
}

export default FollowingModalButton;