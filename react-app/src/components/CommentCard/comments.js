import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from '../../context/modal';
import { EditDeleteComment } from './editComment';
import { useSelector } from 'react-redux'

export const Comments = ({comment, post}) => {
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    

    return (
        <div key={comment.id} className='comments'>
            <img src={comment.users.profile_image}></img>
            <div className='comments-flex'>
                <Link to={`/users/${comment.users.id}`} className="home-card-username-bottom">{comment.users.username}</Link>
                <li className="view-comments" key={comment.id}>{comment.content}</li>
                <li id="date-time">{comment.updated_at}</li>
                {sessionUser.id === comment.user_id && (
                    <>
                        <div onClick={() => setShowModal(true)}><i class="fa-solid fa-ellipsis"></i></div>
                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <EditDeleteComment comment={comment} post={post} setShowModal={setShowModal} />
                                </Modal>
                            )}
                    </>
                )}
            </div>
        </div>
    )
}