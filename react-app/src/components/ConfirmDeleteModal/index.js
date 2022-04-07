import "./ConfirmDeleteModal.css"
import { removePost } from '../../store/userPages'
import { useDispatch } from 'react-redux'

function ConfirmDeleteModal ({post, hideForm, hidePost}) {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    let deletedPost
    deletedPost = dispatch(removePost(post))
    if (deletedPost) {
      hidePost()
    }
  }


  return (
    <div>
      <h3>Delete Post?</h3>
      <div>Are you sure you want to delete this post?</div>
      <button onClick={deleteHandler}>Delete</button>
      <button onClick={() => hideForm()}>Cancel</button>
    </div>
  )
}

export default ConfirmDeleteModal;
