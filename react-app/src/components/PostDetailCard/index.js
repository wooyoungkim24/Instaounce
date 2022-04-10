import './PostDetailCard.css';
import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LikeIconInUserPage from '../LikeIconInUserPage';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Modal } from '../../context/modal';
import { postComment } from '../../store/userPages'
import { Comments } from '../CommentCard/comments'

import UpdatePostForm from '../UpdatePostForm'
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import moment from 'moment'

const PostDetailCard = ({ post, user, hidePost }) => {
    const dispatch = useDispatch()
    const likes = Object.values(post.likes);
    const [currentImage, setCurrentImage] = useState(0);
    const [newComment, setNewComment] = useState('');
    // const [count, setCount] = useState(0)

    // add usestate to show the edit form
    const [showEditForm, setShowEditForm] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)


    const sessionUser = useSelector(state => state.session.user);

    const comments = Object.values(post.comments)
    const sortCommentsFn = (a,b) =>{
        return new Date(b.updated_at) - new Date(a.updated_at)
    }
    comments.sort(sortCommentsFn)
    const images = post.image

    const postOwnerId = post.userId

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

    // const activeDotClass = (index) => {
    //     if (index === currentImage) {
    //         return "fa-solid fa-circle active-dot";
    //     } else {
    //         return "fa-solid fa-circle inactive-dot";
    //     };
    // };

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        const comment = {
            user_id: sessionUser.id,
            post_id: post.id,
            content: newComment
        }
        dispatch(postComment(comment, postOwnerId))
        setNewComment('')
    }

    const handleCommentClick = () => {

        comment.current.focus()
    }


    function lastUpdated() {
        let now = new Date();
        // console.log('curr time', post.updatedAt)
        let splitDate = post.updatedAt.split(" ")
        splitDate.pop()
        let joinDate = splitDate.join(" ")
        let updatedAt = new Date(joinDate)
        // console.log('dateobj', updatedAt)

        let difference = (now - updatedAt) / 1000 / 60 / 60
        
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

    function returnLikes(){
        if(likes === 0 || likes > 1){
            return `${likes.length} likes`
        }else{
            return `${likes.length} like`
        }
    }
    return (
        <>
            <div className='post-dialog'>

                <div className="user-post-details-container">
                    <div className='user-comment-card-images'>
                        <img src={images[currentImage]} alt='post pic' />
                        {currentImage !== 0 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-left user-left-arrow" onClick={leftClickHandler}></i>
                        }
                        {currentImage !== images.length - 1 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-right user-right-arrow" onClick={rightClickHandler}></i>
                        }
                    </div>
                    <div className='comment-card-nonimage-content'>

                        <div className="user">
                            <img src={user.profileImage} alt='profile pic'></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                        </div>

                        <div className='user-card-non-image-content-bottom'>
                            <div className='user-comment-card-icon-tray' >
                                <div className='user-home-card-icon-tray-top-left'>
                                    <LikeIconInUserPage likes={likes} postId={post.id} user={user} />
                                    <i className="fa-regular fa-comment fa-flip-horizontal  comment-icon" onClick={handleCommentClick}></i>
                                </div>
                            </div>
                            <div className='user-comment-card-likes-tray'>
                                {returnLikes()}
                            </div>
                            <div className='user-comment-card-caption-area'>
                                {/* <img src={user.profile_image} alt="profile pic"></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link> */}
                                <div id="user-caption-container">
                                    {post.caption}
                                    {/* {console.log('where is the post time', post)} */}
                                    <div id='user-date-time'>{lastUpdated()}</div>
                                </div>
                                {sessionUser.id === post.userId && (
                                    <div className='user-alter-post-buttons'>
                                        {/* <button onClick={editClickHandler}>Edit</button> */}
                                        <i className="fa-regular fa-pen-to-square edit-icon" onClick={editClickHandler}></i>
                                        {/* <button onClick={deleteClickHandler}>Delete</button> */}
                                        <i className="fa-regular fa-trash-can delete-icon" onClick={deleteClickHandler}></i>

                                    </div>
                                )}
                            </div>

                            <div className="user-comments-container">
                                {comments.map(comment => (
                                    <Comments userId = {comment.user_id} key={comment.id} post={post} comment={comment} />
                                ))}
                            </div>

                        </div>


                        <div className='user-post-comment-div'>
                            <textarea
                                ref={comment}
                                id='new-comment-input'
                                placeholder="Add a comment..."
                                value={newComment}
                                required
                                onChange={e => setNewComment(e.target.value)}
                            />
                            <button disabled={!newComment} onClick={handleCommentSubmit} type='button'>Post</button>
                        </div>


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
