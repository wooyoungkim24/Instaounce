import './HomeFeedCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../LikeIcon';
import { Modal } from '../../context/modal';
import CommentCard from '../CommentCard';
// import { useSelector } from 'react-redux';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
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
    // const [count, setCount] = useState(0)

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

    // useEffect(() => {
    //     const handleMouseEnter = (e) => {
    //         console.log('are you working')
    //         const specificButton = e.target.querySelector(".edit-comment-button-div")
    //         specificButton.style.display = "block"
    //     }
    //     const handleMouseLeave = (e) => {
    //         const specificButton = e.target.querySelector(".edit-comment-button-div")
    //         specificButton.style.display = "none"
    //     }
    //     if (showModal) {
    //         const container = document.querySelector('.comments-container')
    //         let commentsDivs = container.querySelectorAll(".comments")

    //         console.log('mydivs',commentsDivs, commentsDivs.length, comments.length)
    //         for (let i = 0; i < commentsDivs.length; i++) {
    //             let curr = commentsDivs[i]
    //             console.log('what is i', i)
    //             // console.log('wtf',sessionUser.id, comments[i].user_id)

    //             console.log('what is curr', curr)
    //             // if(sessionUser.id === comments[i].user_id){
    //             //     curr.addEventListener('mouseenter', handleMouseEnter)
    //             //     curr.addEventListener('mouseleave', handleMouseLeave)
    //             // }

    //             curr.addEventListener('click', () => console.log('i am working'))
    //             curr.addEventListener('mouseleave', handleMouseLeave)

    //         }
    //         // return (function () {
    //         //     let commentsDivs = document.querySelectorAll(".comments")
    //         //     console.log('wtf now', commentsDivs)
    //         //     for(let i = 0; i < comments.length; i ++){
    //         //         let curr = commentsDivs[i]
    //         //         curr.removeEventListener('mouseenter', handleMouseEnter)
    //         //         curr.removeEventListener('mouseleave', handleMouseLeave)
    //         //     }
    //         // })
    //     }


    // }, [showModal, comments])
    function lastUpdated() {
        let now = new Date();
        let updatedAt = new Date(post.updated_at)
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
                    <div className ='view-comments' onClick={() => setShowModal(true)}>{viewComments()}</div>
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

                        value={newComment}
                        placeholder="Add a comment..."
                        onChange={e => setNewComment(e.target.value)}
                    >
                    </textarea>
                    <button disabled={!newComment} id='post-comment-card-button' onClick={handleCommentSubmit}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
};

export default HomeFeedCard;
