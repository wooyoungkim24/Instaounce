import { useState } from 'react'
import '../CommentCard/CommentCard.css';
import {deleteComment} from '../../store/posts'
import { useDispatch, useSelector } from 'react-redux';
import { putComment, removeComment } from '../../store/userPages'

export const EditDeleteComment = ({comment, setShowModal, post}) => {
    const dispatch = useDispatch()
    const [editedComment, setEditedComment] = useState(comment.content)
    const sessionUser = useSelector(state => state.session.user);
    // const [errors, setErrors] = useState([])
    console.log("post from edit delete comment compo", post)
    const postOwnerId = post.userId
    console.log("post.userId", post.userId)

    const handleDeleteComment = async(e) => {
        e.preventDefault()

        let deletedComment;
        deletedComment = await dispatch(removeComment(comment.id, postOwnerId))

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
        dispatch(putComment(newComment, postOwnerId))
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
