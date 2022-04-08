import './HomeFeedCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../LikeIcon';
import { Modal } from '../../context/modal';
import CommentCard from '../CommentCard';
// import { useSelector } from 'react-redux';
import moment from 'moment'
import { useSelector , useDispatch} from 'react-redux';
import { createComment } from '../../store/posts';

const HomeFeedCard = ({ post }) => {
    const user = post.users;
    const images = post.image;
    const likes = post.likes;
    const comments = Object.values(post.comments)
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    // console.log(post);
    const sessionUser = useSelector(state => {
        return state.session.user
    })
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

    const viewComments = () => {
        if (comments.length === 0) {
            return "Be the first to comment!"
        } else if (comments.length === 1) {
            return "View 1 comment"
        } else {
            return `View all ${comments.length} comments`
        }
    }
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
    function lastUpdated() {
        let now = new Date();
        let updatedAt = new Date(post.updated_at)
        let difference = (now-updatedAt)/1000/60/60
        if(difference > 24){
            return moment(updatedAt).format("MMMM D YYYY")
        }else{
            return `${Math.floor(difference)} hours ago`
        }
    }
    return (
        <div className='home-card'>
            <div className='home-card-header'>
                <Link to={`/users/${user.id}`} >
                    <img className='home-card-profile-pic' src={user.profile_image} alt='profile pic' />
                </Link>
                <Link className='home-card-username-top' to={`/users/${user.id}`}>
                    {user.username}
                </Link>
            </div>
            <div className='home-card-images'>
                <img src={images[currentImage]} alt='post pic' />
                {currentImage !== 0 && images.length > 1 &&
                    <i className="fa-solid fa-circle-chevron-left left-arrow" onClick={leftClickHandler}></i>
                }
                {currentImage !== images.length - 1 && images.length > 1 &&
                    <i className="fa-solid fa-circle-chevron-right right-arrow" onClick={rightClickHandler}></i>
                }
            </div>
            <div className='home-card-nonimage-content'>
                <div className='home-card-icon-tray' >
                    <div className='home-card-icon-tray-top-left'>
                        <LikeIcon likes={likes} postId={post.id} />
                        <i onClick={() => setShowModal(true)} className="fa-regular fa-comment fa-flip-horizontal  comment-icon" />
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <CommentCard post={post} />
                            </Modal>
                        )}
                    </div>
                    {images.length > 1 &&
                        <div className='home-card-icon-tray-dots'>
                            {images.map((image, index) => (
                                <i key={index} className={activeDotClass(index)}></i>
                            ))}
                        </div>
                    }
                </div>
                <div className='home-card-likes-tray'>
                    {likes.length} likes
                </div>
                <div className='home-card-caption-area'>
                    <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                    {post.caption}
                </div>
                <div className='home-card-view-comments'>
                    {/* <Link to={`/${post.id}/comments`}> */}
                    <div onClick={() => setShowModal(true)}>{viewComments()}</div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CommentCard post={post} />
                        </Modal>
                    )}
                    {/* </Link> */}
                </div>
                <div className='lastUpdated'>
                    {lastUpdated()}
                </div>
                <div className='card-comment-input'>
                    <textarea

                    value = {newComment}
                    placeholder="Add a comment..."
                    onChange = {e => setNewComment(e.target.value)}
                    >
                    </textarea>
                    <button disabled ={!newComment} id='post-comment-card-button' onClick={handleCommentSubmit}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
};

export default HomeFeedCard;
