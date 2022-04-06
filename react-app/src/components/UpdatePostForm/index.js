import './UpdatePostForm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikeIcon from '../LikeIcon';
import { editPost } from '../../store/posts';
import { Link } from 'react-router-dom';

const UpdatePostForm = ({ post, user }) => {
  console.log(post, "post!!!!from update form")
  // console.log(user, "user!!!! from update form")
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)

  const [caption, setCaption] = useState(post.caption)
  const [user_id, setUserId] = useState(post.user_id)

  console.log(post.caption,"post.caption from update form")

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
      user_id,
      caption,
      image: images,
    }
    console.log("new payload", payload)
    await dispatch(editPost(payload))


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
                            <img src={user.profile_image}></img>
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
                                <button>Done</button>
                                <button>Cancel</button>

                              </form>
                            </div>
                        </div>

                    </div>

            </div>
        </div>

  )
}

export default UpdatePostForm
