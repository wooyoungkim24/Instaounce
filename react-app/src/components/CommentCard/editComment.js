import { useState } from 'react'
import './CommentCard.css';
import { deleteComment } from '../../store/posts'
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from '../../store/posts'
import { updateComment, deleteCommentAction } from '../../store/userPages';

export const EditDeleteComment = ({ comment, setShowModal, post }) => {
    const dispatch = useDispatch()
    const [editedComment, setEditedComment] = useState(comment.content)
    const sessionUser = useSelector(state => state.session.user);
    // const [errors, setErrors] = useState([])

    const handleDeleteComment = async (e) => {
        e.preventDefault()

        dispatch(deleteComment(comment.id))
        .then(() => dispatch(deleteCommentAction(comment, post.userId || post.user_id)))

        setShowModal(false)

    }

    const handleEditComment = async (e) => {
        e.preventDefault()

        const newComment = {
            id: comment.id,
            user_id: sessionUser.id,
            post_id: post.id,
            content: editedComment
        }
        // console.log('what is the new comment',newComment)
        // let editedComment;
        dispatch(editComment(newComment))
            .then((res) => dispatch(updateComment(res, post.userId || post.user_id)))

        // .catch(async res => {
        //     const data = await res.json();
        //     if(data && data.errors) setErrors(data.errors)
        // })
        // if(editedComment){
        //     setErrors([])
        // }
        setShowModal(false)
    }

    const setTextColor = () => {
        return editedComment.length && editedComment.length <= 2000 ? { 'color': 'black', 'marginRight': '5px' } : { 'color': 'red', 'marginRight': '5px' }
    }

    const disableSubmit = (attribute) => {
        if (attribute ===  'disabled') {
            return editedComment.length && editedComment.length <= 2000 ? false : true
        } else if (attribute === 'id') {
            return editedComment.length && editedComment.length <= 2000 ? 'edit-comment-button-enabled' : 'edit-comment-button-disabled'
        }
    }


    return (
        <div className='edit-comment-modal'>


            <textarea
                id='new-comment-input'
                value={editedComment}
                required
                onChange={e => setEditedComment(e.target.value)}
                maxLength={2000}
            />
            <div className='edit-comment-character-count'>
                <span style={setTextColor()}>{editedComment.length}</span>/ 2000
            </div>

            <button id={disableSubmit('id')} disabled={disableSubmit('disabled')} onClick={handleEditComment} type='button'>Edit</button>
            <button id='delete-comment-button' onClick={handleDeleteComment}>Delete</button>
        </div>
    )
}
