import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from '../../context/modal';
import { EditDeleteComment } from './editComment';
import { useSelector } from 'react-redux'
import moment from 'moment'

export const Comments = ({ userId, comments, comment, post }) => {
    const [showModal, setShowModal] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    function lastUpdated() {
        let now = new Date();
        let updatedAt = new Date(comment.updated_at)
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
    const handleMouseEnter = (e) => {
        if (sessionUser.id === userId) {
            setShowButton(true)
        }

    }
    const handleMouseLeave = (e) => {
        setShowButton(false)
    }


    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='comments'>
            <img src={comment.users.profile_image} alt="profile pic"></img>
            <div className="comment-card-comment-info">
                <div className='comments-flex'>
                    <Link to={`/users/${comment.users.id}`} className="comment-card-username-bottom">{comment.users.username}</Link>
                    &nbsp;&nbsp;{comment.content}
                </div>
                <div className="comment-card-each-bottom-nav">
                    <div id="date-time">
                        {lastUpdated()}
                    </div>
                    {sessionUser.id === comment.user_id && (
                        <div className="edit-comment-button-div">

                            {showButton &&
                                <div className='edit-comment-button' onClick={() => setShowModal(true)}>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            }

                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <EditDeleteComment comment={comment} post={post} setShowModal={setShowModal} />
                                </Modal>
                            )}
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}
