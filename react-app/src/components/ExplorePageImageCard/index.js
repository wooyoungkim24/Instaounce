import './ExplorePageImageCard.css';
import { useState } from 'react';
import '../UserProfileImageCard/UserProfileImageCard.css'

const ExplorePageImageCard = ({ post }) => {
    const [isHovering, setIsHovering] = useState();


    const mouseEnterHandler = () => {
        setIsHovering(true);
    };

    const mouseLeaveHandler = () => {
        setIsHovering(false)
    };

    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className='explore-page-card profile-image-card-container'>
            {isHovering &&
                <>
                    {/* <div className='profile-image-username'>
                        @{post.users.username}
                    </div> */}
                    <div className='profile-image-like-stat'>
                        <i className="fa-solid fa-heart profile-image-card-heart"></i>
                        {post.likes.length}
                    </div>
                    <div className='profile-image-comment-stat'>
                        <i className="fa-solid fa-comment fa-flip-horizontal  profile-image-card-comment-icon"></i>
                        {Object.values(post.comments).length}
                    </div>
                    <div className='profile-image-card-hover-wrapper' /* onClick={() => setShowPostDetailCard(true)} */>

                    </div>
                </>
            }
            <img className='explore-page-small-image profile-image-card-image' src={post.image[0]} alt='explore pic' />
        </div>
    );
};

export default ExplorePageImageCard;