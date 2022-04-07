import { useState } from 'react'
import './CommentCard.css';
import {deleteComment} from '../../store/posts'
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from '../../store/posts'

export const EditDeleteComment = ({comment, setShowModal, post}) => {
    const dispatch = useDispatch()
    const [editedComment, setEditedComment] = useState(comment.content)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([])

    const handleDeleteComment = async(e) => {
        e.preventDefault()

        let deletedComment;
        deletedComment = dispatch(deleteComment(comment.id))
     
        if(deletedComment){
            setShowModal(false)
        }
    }

    const handleEditComment = async(e) => {
        e.preventDefault()

        const newComment = {
            id: comment.id,
            user_id: sessionUser.id,
            post_id: post.id,
            content: editedComment
        }
        // let editedComment;
        dispatch(editComment(newComment))
        // .catch(async res => {
        //     const data = await res.json();
        //     if(data && data.errors) setErrors(data.errors)
        // })
        // if(editedComment){
        //     setErrors([])
        // }
    }

    

    return (
        <div className='edit-comment-modal'>
            <label>Edit Comment
                <form onSubmit={handleEditComment}>
                    <textarea
                    id='new-comment-input'
                    value={editedComment}
                    required
                    onChange={e => setEditedComment(e.target.value)}
                    />
                    <button type='submit'>Edit</button>
                </form>
            </label>
            <button onClick={handleDeleteComment}>Delete</button>
        </div>
    )
}