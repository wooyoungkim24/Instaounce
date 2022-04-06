import './CommentCard.css';
import { useState } from 'react'
import LikeIcon from '../LikeIcon';
import { Link } from 'react-router-dom';
import { createComment } from '../../store/posts';
import { useSelector, useDispatch } from 'react-redux'


const CommentCard = ({ post }) => {
    const dispatch = useDispatch()
    const user = post.users;
    const likes = post.likes;
    const [currentImage, setCurrentImage] = useState(0);
    const [newComment, setNewComment] = useState('');
    const comments = post.comments
    const images = post.image
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([])
   

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
    
    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        const comment = {
            user_id: sessionUser.id,
            post_id: post.id,
            content: newComment
        }
        let createdComment;
        dispatch(createComment(comment))
        .catch(async res => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        })
        if(createdComment){
            setErrors([])
        }
    }

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
                        <form className="make-comment" onSubmit={handleCommentSubmit}>
                                <textarea
                                id='new-comment-input'
                                placeholder="Add a comment..."
                                value={newComment}
                                required
                                onChange={e => setNewComment(e.target.value)}
                                />
                            <button type='submit'>Post</button>
                        </form>
                    </div>
        
            </div>
        </div>
    )
}

export default CommentCard;