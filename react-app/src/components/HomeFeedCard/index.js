import './HomeFeedCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../LikeIcon';
import { Modal } from '../../context/modal';
import CommentCard from '../CommentCard';
import { useSelector } from 'react-redux';

const HomeFeedCard = ({ post }) => {
    const user = post.users;
    const images = post.image;
    const likes = post.likes;
    const comments = Object.values(post.comments)
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // console.log(post);

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
                        <div onClick={() => setShowModal(true)}><i className="fa-regular fa-comment fa-flip-horizontal  comment-icon"/></div>
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
            </div>
        </div>
    )
};

export default HomeFeedCard;
