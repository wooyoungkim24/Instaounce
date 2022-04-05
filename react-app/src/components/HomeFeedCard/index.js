import './HomeFeedCard.css';
import { Link } from 'react-router-dom';

const HomeFeedCard = ({ post }) => {
    const user = post.users
    const images = post.image
    console.log(post)
    return (
        <div className='home-card'>
            <div className='home-card-header'>
                <Link to={`/users/${user.id}`} >
                    <img className='home-card-profile-pic' src={user.profile_image} alt='profile pic' />
                </Link>
                <Link className='home-card-username' to={`/users/${user.id}`}>
                    {user.username}
                </Link>
            </div>
            <div className='home-card-images'>
                <img src={images[0]} alt='post pic' />
                <i className="fa-solid fa-circle-chevron-left left-arrow"></i>
                <i className="fa-solid fa-circle-chevron-right right-arrow"></i>
            </div>
            <div className='home-card-icon-tray' >
                <div className='home-card-icon-tray-top-left'>
                    <span>L.K.C</span>
                    <span>C.C</span>
                </div>
                {images.length > 1 &&
                    <div class='home-card-icon-tray-dots'>
                        {images.map((image, index) => (
                            <i key={index} class="fa-solid fa-circle"></i>
                        ))}
                    </div>
                }
            </div>
            <div>
                <Link to={`/users/${user.id}`} >{user.username}</Link>
                {post.caption}
            </div>
        </div>
    )
};

export default HomeFeedCard;