import './UserProfile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileDetails from '../UserProfileDetails';
import { loadUserPage } from '../../store/userPages';

const UserProfile = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const pageData = useSelector(state => state.pageState[userId]);

    useEffect(() => {
        dispatch(loadUserPage(userId))
        .then(() => setIsLoaded(true))
    },[dispatch]);


    return (
        <div className='user-profile-body'>
            {isLoaded &&
                <UserProfileDetails user={pageData} />
            }
        </div>

    )

}

export default UserProfile;