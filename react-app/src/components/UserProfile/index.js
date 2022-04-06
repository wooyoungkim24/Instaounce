import './UserProfile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileDetails from '../UserProfileDetails';
import { loadUserPage } from '../../store/userPages';
import UserProfileImageCard from '../UserProfileImageCard';

const UserProfile = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const { userId } = useParams();
    const dispatch = useDispatch();

    const pageData = useSelector(state => state.pageState[userId]);
    let posts;
    if (pageData) posts = Object.values(pageData.posts)

    useEffect(() => {
        dispatch(loadUserPage(userId))
        .then(() => setIsLoaded(true))
    },[dispatch]);


    return isLoaded && (
        <div className='user-profile-body'>
                <UserProfileDetails user={pageData} />
            <div className='user-profile-images'>
                {posts.map(post => (
                    <UserProfileImageCard post={post} />
                    ))}
            </div>
        </div>

    )

}

export default UserProfile;