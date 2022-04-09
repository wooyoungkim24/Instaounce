import './UpdatePostForm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPost } from '../../store/userPages';
import { Link } from 'react-router-dom';

const UpdatePostForm = ({ post, user, hideForm }) => {

  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)

  const [caption, setCaption] = useState(post.caption)

  console.log("user from updatePostForm", user)

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
      image: images,
    }
    console.log("new payload", payload)
    await dispatch(editPost(payload))

    hideForm()


  }

  const cancelHandler = () => {
    hideForm()
  }


const activeDotClass = (index) => {
    if (index === currentImage) {
        return "fa-solid fa-circle active-dot";
    } else {
        return "fa-solid fa-circle inactive-dot";
    };
};


  return (
    <div className='post-dialog'>

            <div className="post-details-container">
                <div className='comment-card-images'>
                        <img src={images[currentImage]} alt='post pic' />
                        {currentImage !== 0 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-left left-arrow" onClick={leftClickHandler}></i>
                        }
                        {currentImage !== images.length - 1 && images.length > 1 &&
                            <i className="fa-solid fa-circle-chevron-right right-arrow" onClick={rightClickHandler}></i>
                        }
                </div>
                <div className='comment-card-nonimage-content'>
                        <div className="user">
                            <img src={user.profileImage} alt="profile pic"></img>
                            {user.username}
                        </div>

                        <div className='comment-card-icon-tray' >

                            {images.length > 1 &&
                                <div className='home-card-icon-tray-dots'>
                                    {images.map((image, index) => (
                                        <i key={index} className={activeDotClass(index)}></i>
                                    ))}
                                </div>
                            }
                        </div>

                        <div className='comment-card-caption-area'>

                            <div  id="caption-container">
                              <form onSubmit={submitHandler}>
                                {/* <label htmlFor='caption'></label> */}
                                <textarea
                                  type="text"
                                  name='caption'
                                  value={caption}
                                  onChange={ (e) => setCaption(e.target.value)}
                                >
                                </textarea>
                                <button type='submit'>Done</button>
                                <button type='button' onClick={cancelHandler}>Cancel</button>

                              </form>
                            </div>
                        </div>

                    </div>

            </div>
        </div>

  )
}

export default UpdatePostForm
