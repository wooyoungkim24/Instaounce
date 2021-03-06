import './UpdatePostForm.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editPost } from '../../store/userPages';
import { updatePost } from '../../store/posts';
// import { Link } from 'react-router-dom';

const UpdatePostForm = ({ post, user, hideForm }) => {

  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)

  const [caption, setCaption] = useState(post.caption)

  const images = post.image

  const rightClickHandler = () => {
    if (currentImage !== images.length - 1) {
      setCurrentImage(currentImage + 1);
    };
  };

  const leftClickHandler = () => {
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault()

    const payload = {
      ...post,
      // user_id,
      caption,
      image: images
    }
    const editedPost = await dispatch(editPost(payload))

    if (editedPost) {
      await dispatch(updatePost(editedPost))
    }
    hideForm()


  }

  const cancelHandler = () => {
    hideForm()
  }


  // const activeDotClass = (index) => {
  //   if (index === currentImage) {
  //     return "fa-solid fa-circle active-dot";
  //   } else {
  //     return "fa-solid fa-circle inactive-dot";
  //   };
  // };

  const setTextColor = () => {
    return caption.length <= 2000 ? { 'color': 'black', 'marginRight': '5px' } : { 'color': 'red', 'marginRight': '5px' }
  }

  const disableSubmit = (attribute) => {
    if (attribute === 'disabled') {
      return caption.length <= 2000 ? false : true
    } else if (attribute === 'id') {
      return caption.length <= 2000 ? 'edit-caption-submit-enabled' : 'edit-caption-submit-disabled'
    }
  }


  return (
    <div className='post-dialog'>

      <div className="post-details-container">
        <div className='comment-card-images'>
          <img src={images[currentImage]} alt='post pic' />
          {currentImage !== 0 && images.length > 1 &&
            <i className="fa-solid fa-circle-chevron-left user-left-arrow" onClick={leftClickHandler}></i>
          }
          {currentImage !== images.length - 1 && images.length > 1 &&
            <i className="fa-solid fa-circle-chevron-right user-right-arrow" onClick={rightClickHandler}></i>
          }
        </div>
        <div className='comment-card-nonimage-content'>
          <div className="user">
            <img src={user.profileImage} alt="profile pic"></img>
            {user.username}
          </div>

          {/* <div className='comment-card-icon-tray' >

                            {images.length > 1 &&
                                <div className='home-card-icon-tray-dots'>
                                    {images.map((image, index) => (
                                        <i key={index} className={activeDotClass(index)}></i>
                                    ))}
                                </div>
                            }
                        </div> */}

          <div className='edit-caption-area'>
            <div className='edit-caption-area-title'>
              Edit Caption
            </div>

            <div id="edit-caption-container">

              {/* <label htmlFor='caption'></label> */}
              <textarea
                type="text"
                name='caption'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={2000}
              >
              </textarea>
              <div className='edit-caption-count'>
                <span style={setTextColor()}>{caption.length}</span>/ 2000
              </div>
              <div className='edit-caption-submit-buttons'>
                <button id={disableSubmit('id')} disabled={disableSubmit('disabled')} type='button' onClick={submitHandler} >Done</button>
                <button id='edit-caption-cancel' type='button' onClick={cancelHandler}>Cancel</button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

  )
}

export default UpdatePostForm
