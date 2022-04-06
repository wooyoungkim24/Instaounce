import './CommentCard.css';
import { useState } from 'react'
import LikeIcon from '../LikeIcon';
import { Link } from 'react-router-dom';


const CommentCard = ({ post }) => {
    const user = post.users;
    const likes = post.likes;
    const [currentImage, setCurrentImage] = useState(0);
    const comments = post.comments
    const images = post.image
   

    const rightClickHandler = () => {
        if (currentImage !== images.length - 1) {
            setCurrentImage(currentImage + 1);
        };
    };

    const leftClickHandler = () => {
        if (currentImage !== 0) {
            setCurrentImage(currentImage - 1);
        };
    };

    const activeDotClass = (index) => {
        if (index === currentImage) {
            return "fa-solid fa-circle active-dot";
        } else {
            return "fa-solid fa-circle inactive-dot";
        };
    };

    return (
        <div className='post-dialog'>

            <div className="post-details-container">
                <div className='comment-card-images'>
                        <img src={images[currentImage]} alt='post pic' />
                        {currentImage !== 0 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-left left-arrow" onClick={leftClickHandler}></i>
                        }
                        {currentImage !== images.length - 1 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-right right-arrow" onClick={rightClickHandler}></i>
                        }
                </div>
                <div className='comment-card-nonimage-content'>
                        <div className="user">
                            <img src={user.profile_image}></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                        </div>
                        
                        <div className='comment-card-icon-tray' >
                            <div className='home-card-icon-tray-top-left'>
                                <LikeIcon likes={likes} postId={post.id} />
                                <i className="fa-regular fa-comment fa-flip-horizontal  comment-icon"></i>
                            </div>
                            {images.length > 1 &&
                                <div className='home-card-icon-tray-dots'>
                                    {images.map((image, index) => (
                                        <i key={index} className={activeDotClass(index)}></i>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='comment-card-likes-tray'>
                            {likes.length} likes
                        </div>
                        <div className='comment-card-caption-area'>
                                <img src={user.profile_image}></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                            <div  id="caption-container">
                                {post.caption}
                                <div id='date-time'>{post.updated_at}</div>
                            </div>
                        </div>
                        <div className='view-comments'>
                            <ul className='comments-container'>
                                {comments.map(comment => (
                                    <>
                                        <li key={comment.id}>{comment.content}</li>
                                        <li>{comment.updated_at}</li>
                                    </>
                                ))}
                            </ul>
                            
                        </div>
                    </div>
        
            </div>
        </div>
    )
}

export default CommentCard;