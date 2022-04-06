import './UserProfileImageCard.css'
import { useState } from 'react'
import PostDetailCard from '../PostDetailCard';
import { Modal } from '../../context/modal';

const UserProfileImageCard = ({ post, user }) => {
    const [isHovering, setIsHovering] = useState(false);

    const [showCommentCard, setShowCommentCard] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)


    const comments = Object.values(post.comments);
    const likes = Object.values(post.likes);

    const mouseEnterHandler = () => {
        setIsHovering(true);
    };

    const mouseLeaveHandler = () => {
        setIsHovering(false)
    };

    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className="profile-image-card-container">
            {isHovering &&
            <>
                <div className='profile-image-like-stat'>
                <i class="fa-solid fa-heart profile-image-card-heart"></i>
                {likes.length}
            </div>
            <div className='profile-image-comment-stat'>
                <i className="fa-solid fa-comment fa-flip-horizontal  profile-image-card-comment-icon"></i>
                {comments.length}
            </div>
            <div className='profile-image-card-hover-wrapper' onClick={() => setShowCommentCard(true)}>
            {showCommentCard && (
                 <Modal onClose={() => showCommentCard(false)}>
                    <PostDetailCard post={post} user={user}/>
                </Modal>

            )}
            </div>
            </>
}
            <img src={post.image[0]} alt='pic' className="profile-image-card-image" />
        </div>
    )
};

export default UserProfileImageCard;
