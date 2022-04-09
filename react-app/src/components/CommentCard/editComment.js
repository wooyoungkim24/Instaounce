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


        console.log('waht is the type', typeof comment.id)
        dispatch(deleteComment(comment.id))
        dispatch(deleteCommentAction(comment))

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
        .then((res) => dispatch(updateComment(res)))

        // .catch(async res => {
        //     const data = await res.json();
        //     if(data && data.errors) setErrors(data.errors)
        // })
        // if(editedComment){
        //     setErrors([])
        // }
        setShowModal(false)
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
                {editedComment.length}/2000
            </div>

            <button id='edit-comment-button' onClick={handleEditComment} type='button'>Edit</button>
            <button id='delete-comment-button' onClick={handleDeleteComment}>Delete</button>
        </div>
    )
}
