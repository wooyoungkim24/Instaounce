import './HomeFeedCard.css';
import { Link } from 'react-router-dom';

const HomeFeedCard = ({ post }) => {
    const user = post.users
    console.log(post.image)
    return (
        <div className='home-card'>
            <div className='home-card-header'>
                <Link to={`/users/${user.id}`} >
                    <img src={user.profile_image} alt='profile pic' />
                </Link>
                <Link>
                    {user.username}
                </Link>
            </div>
            <div>
                <img src={post.image[0]} alt='post pic' />
            </div>
        </div>
    )
};

export default HomeFeedCard;