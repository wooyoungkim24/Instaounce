import './UserProfile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileDetails from '../UserProfileDetails';

const UserProfile = () => {

    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState({})
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();

            const res = await fetch(`/api/users/${userId}/posts`);
            const posts = await res.json().then(() => setIsLoaded(true))

            setUser(user);
            setPosts(posts);
            console.log(posts)
            setIsLoaded(true);
        })();
    }, []);

    if (!user) {
        return null;
    }


    return (
        <div>
            {isLoaded &&
                <UserProfileDetails userInfo={user} />
            }
        </div>

    )
    return (
        <ul>
            <li>
                <strong>User Id</strong> {userId}
            </li>
            <li>
                <strong>Username</strong> {user.username}
            </li>
            <li>
                <strong>Email</strong> {user.email}
            </li>
        </ul>
    );

}

export default UserProfile;