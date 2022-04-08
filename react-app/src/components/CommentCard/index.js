import './CommentCard.css';
import { useState, useRef } from 'react'
import LikeIcon from '../LikeIcon';
import { Link } from 'react-router-dom';
import { createComment } from '../../store/posts';
import { useSelector, useDispatch } from 'react-redux'
// import { Modal } from '../../context/modal';
// import { EditDeleteComment } from './editComment';
import { Comments } from './comments'
import moment from 'moment'

const CommentCard = ({ post }) => {
    const dispatch = useDispatch()
    const user = post.users;
    const likes = post.likes;
    const [currentImage, setCurrentImage] = useState(0);
    const [newComment, setNewComment] = useState('');
    const comments = Object.values(post.comments)
    const sortCommentsFn = (a,b) =>{
        console.log(b)
        return new Date(b.updated_at) - new Date(a.updated_at)
    }
    comments.sort(sortCommentsFn)
    const images = post.image
    const sessionUser = useSelector(state => state.session.user);



    const comment = useRef()

    // const [errors, setErrors] = useState([])
    // const [showModal, setShowModal] = useState(false)



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
        dispatch(createComment(comment))
        setNewComment('')
    }


    const handleCommentClick = () => {
        // const commentForm = document.querySelector('.make-comment')
        // const text = commentForm.querySelector('textarea').focus()
        // console.log(text)
        // document.getElementById('new-comment-input').focus()
        comment.current.focus()
    }

    function lastUpdated() {
        let now = new Date();
        let updatedAt = new Date(post.updated_at)
        let difference = (now - updatedAt) / 1000 / 60 / 60
        console.log('what is the difference', difference)
        if (difference > 24) {
            return moment(updatedAt).format("MMMM D YYYY")
        } else if (difference < 1) {
            if (Math.floor(difference * 60) === 1) {
                return `${Math.floor(difference * 60)} minute ago`
            } else if (difference * 60 < 1) {
                return "Less than a minute ago"
            }
            return `${Math.floor(difference * 60)} minutes ago`
        }
        else if (Math.floor(difference) === 1) {
            return `${Math.floor(difference)} hour ago`
        } else {
            return `${Math.floor(difference)} hours ago`
        }
    }
    function lastLiked() {
        if (likes.length === 0) {
            return 'No recent likes'
        }
        let max;

        let now = new Date()
        for (let i = 0; i < likes.length; i++) {

            let curr = likes[i]

            let currDate = new Date(curr.updated_at);
            if (max == undefined) {
                max = currDate
            }
            if (currDate >= max) {
                max = currDate
            }
        }

        let difference = (now - max) / 1000 / 60 / 60


        if (difference > 24) {
            return moment(max).format("MMMM D YYYY")
        } else if (difference < 1) {
            if (Math.floor(difference * 60) === 1) {
                return `${Math.floor(difference * 60)} minute ago`
            } else if (difference * 60 < 1) {
                return "Less than a minute ago"
            }
            return `${Math.floor(difference * 60)} minutes ago`
        }
        else if (Math.floor(difference) === 1) {
            return `${Math.floor(difference)} hour ago`
        } else {
            return `${Math.floor(difference)} hours ago`
        }

    }

    return (
        <div className='post-dialog'>

            <div className="post-details-container">
                <div className='comment-card-images'>
                    <img src={images[currentImage]} alt='post pic' />
                    {currentImage !== 0 && images.length > 1 &&
                        <i className="fa-solid fa-circle-chevron-left modal-left-arrow" onClick={leftClickHandler}></i>
                    }
                    {currentImage !== images.length - 1 && images.length > 1 &&
                        <i className="fa-solid fa-circle-chevron-right modal-right-arrow" onClick={rightClickHandler}></i>
                    }
                </div>

                <div className='comment-content'>

                    <div className="user">
                        <img src={user.profile_image} alt='profile pic'></img>
                        <Link to={`/users/${user.id}`} className="comment-card-username-top-top">{user.username}&nbsp;</Link>
                        · Following
                    </div>

                    <div className='view-all-comments'>
                        <div className='comment-card-caption-area'>
                            <div className='comment-card-caption-image'>
                                <img src={user.profile_image} alt='profile pic'></img>
                            </div>

                            <div className='comment-card-caption'>
                                <div id="caption-container">
                                    <Link to={`/users/${user.id}`} className="comment-card-username-bottom">{user.username}</Link>
                                    &nbsp;&nbsp;{post.caption}

                                </div>
                                <div id='date-time'>
                                    {lastUpdated()}
                                </div>
                            </div>



                        </div>
                        <div className="comments-container">
                            {comments.map(comment => (
                                <Comments key={comment.id} post={post} comment={comment} />
                            ))}
                        </div>
                    </div>
                    <div className='interact-comment-section'>
                        <div className='comment-card-icon-tray' >
                            <div className='comment-card-icon-tray-top-left'>
                                <LikeIcon likes={likes} postId={post.id} />
                                <div onClick={handleCommentClick}>
                                    <i className="fa-regular fa-comment fa-flip-horizontal  comment-modal-icon"></i>
                                </div>
                            </div>
                            {/* {images.length > 1 &&
                                <div className='home-card-icon-tray-dots'>
                                    {images.map((image, index) => (
                                        <i key={index} className={activeDotClass(index)}></i>
                                    ))}
                                </div>
                            } */}
                        </div>
                        <div className='comment-card-likes-tray'>
                            <div className='likes-count'>
                                {likes.length} likes
                            </div>
                            <div className='last-liked'>
                                {lastLiked()}
                            </div>

                        </div>
                        <div className="make-comment-modal" >

                            <textarea
                                ref={comment}
                                id='new-comment-input'
                                placeholder="Add a comment..."
                                value={newComment}
                                required
                                onChange={e => setNewComment(e.target.value)}
                            />
                            <button disabled ={!newComment} onClick={handleCommentSubmit} type='button'>Post</button>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default CommentCard;
