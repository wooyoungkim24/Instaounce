import './CommentCard.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import getComments from '../../store/posts'
import { useParams } from 'react-router-dom'
import { ReactDOM } from 'react';

const CommentCard = ({ comment }) => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const [showModal, setShowModal] = useState(false);
    // const comments = useSelector(state => state.feedState.followedPosts)
    // console.log(comments)
    // useEffect(() => {
    //     dispatch(getComments(postId))
    // },[dispatch])

    const onClose = () => {
        setShowModal(false)
    }

    return ReactDOM.createPortal(
        <div>
           <div id="modal">
            <div id="modal-background" onClick={onClose}/>
                <div id="modal-content">
                    
                </div>
            </div>
        </div>
    )
}

export default CommentCard;