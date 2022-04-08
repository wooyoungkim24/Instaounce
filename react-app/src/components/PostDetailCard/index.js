import './PostDetailCard.css';
import { useState, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import LikeIconInUserPage from '../LikeIconInUserPage';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Modal } from '../../context/modal';
import { postComment } from '../../store/userPages'

import UpdatePostForm from '../UpdatePostForm'
import ConfirmDeleteModal from '../ConfirmDeleteModal';


const PostDetailCard = ({ post, user, hidePost }) => {
    const dispatch = useDispatch()
    const likes = Object.values(post.likes);
    const [currentImage, setCurrentImage] = useState(0);
    const [newComment, setNewComment] = useState('');
    // add usestate to show the edit form
    const [showEditForm, setShowEditForm] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)


    const sessionUser = useSelector(state => state.session.user);

    const comments = Object.values(post.comments)
    const images = post.image

    const comment = useRef()

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

    const editClickHandler = () => {
        setShowEditForm(true)
    }

    const deleteClickHandler = () => {
        setShowConfirmModal(true)
    }

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
        dispatch(postComment(comment))
        setNewComment('')
    }

    const handleCommentClick = () => {

        comment.current.focus()
    }

    return (
        <>
            <div className='post-detail-card'>

                <div className="post-detail-card-container">
                    <div className='post-detail-card-images'>
                        <div className='image-container'>
                            <img src={images[currentImage]} alt='post pic' />
                        </div>
                        {currentImage !== 0 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-left left-arrow" onClick={leftClickHandler}></i>
                        }
                        {currentImage !== images.length - 1 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-right right-arrow" onClick={rightClickHandler}></i>
                        }
                    </div>
                    <div className='post-detail-content'>
                        <div className="user">
                            <img src={user.profileImage}></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                        </div>


                        <div className='comment-card-icon-tray' >
                            <div className='home-card-icon-tray-top-left'>
                                <LikeIconInUserPage likes={likes} postId={post.id} user={user} />
                                <i className="fa-regular fa-comment fa-flip-horizontal  comment-icon" onClick={handleCommentClick}></i>
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
                            {/* <img src={user.profile_image} alt="profile pic"></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link> */}
                            <div id="caption-container">
                                {post.caption}
                                <div id='date-time'>{post.updated_at}</div>
                            </div>
                            {sessionUser.id === post.userId && (
                                <div>
                                    {/* <button onClick={editClickHandler}>Edit</button> */}
                                    <i class="fa-regular fa-pen-to-square edit-icon" onClick={editClickHandler}></i>
                                    {/* <button onClick={deleteClickHandler}>Delete</button> */}
                                    <i class="fa-regular fa-trash-can delete-icon" onClick={deleteClickHandler}></i>

                                </div>
                            )}
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
                                        ref={comment}
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
            {showEditForm && (
                <Modal onClose={() => setShowEditForm(false)}>
                    <UpdatePostForm post={post} user={user} hideForm={() => setShowEditForm(false)} />
                </Modal>
            )}

            {showConfirmModal && (
                <Modal onClose={() => setShowConfirmModal(false)}>
                    <ConfirmDeleteModal post={post} hidePost={hidePost} hideForm={() => setShowConfirmModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default PostDetailCard;
