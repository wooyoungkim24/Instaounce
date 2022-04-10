import "./ConfirmDeleteModal.css"
import { removePost } from '../../store/userPages'
import { useDispatch } from 'react-redux'
import { destroyPost } from "../../store/posts"

function ConfirmDeleteModal({ post, hideForm, hidePost }) {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    let deletedPost
    deletedPost = dispatch(removePost(post))
    dispatch(destroyPost(post.id))
    if (deletedPost) {
      hidePost()
    }
  }


  return (
    <div className="delete-post-modal">

      <div className="delete-post-title">
        Delete Post?
      </div>
      <div className="delete-post-confirm">
        Are you sure you want to delete this post?
      </div>
      <div className="delete-post-modal-buttons">

        <button id='delete-modal-delete' onClick={deleteHandler}>Delete</button>
        <button id='delete-modal-cancel' onClick={() => hideForm()}>Cancel</button>
      </div>

    </div>
  )
}

export default ConfirmDeleteModal;
