import './HomeFeedCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../LikeIcon';

const HomeFeedCard = ({ post }) => {
    const user = post.users;
    const images = post.image;
    const [currentImage, setCurrentImage] = useState(0);
    console.log(post);

    const rightClickHandler = () => {
        if (currentImage !== images.length - 1) {
            setCurrentImage(currentImage + 1)
        }
    };

    const leftClickHandler = () => {
        if (currentImage !== 0) {
            setCurrentImage(currentImage - 1)
        }
    }

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
                <img src={images[currentImage]} alt='post pic' />
                { currentImage !== 0 && 
                    <i className="fa-solid fa-circle-chevron-left left-arrow" onClick={leftClickHandler}></i>
                }
                { currentImage !== images.length - 1 &&
                    <i className="fa-solid fa-circle-chevron-right right-arrow" onClick={rightClickHandler}></i>
                }
            </div>
            <div className='home-card-icon-tray' >
                <div className='home-card-icon-tray-top-left'>
                    <LikeIcon userLikes={post.likes} />
                    <i class="fa-regular fa-comment fa-flip-horizontal  comment-icon"></i>
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