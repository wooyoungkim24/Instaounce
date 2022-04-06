import './UpdatePostForm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikeIcon from '../LikeIcon';
import { editPost } from '../../store/posts';

const UpdatePostForm = ({ post, user }) => {
  console.log(post, "post!!!!from update form")
  // console.log(user, "user!!!! from update form")
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)
  const [caption, setCaption] = useState(post.caption)
  const [user_id, setUserId] = useState(post.user_id)

  console.log(post.caption,"post.caption from update form")

  const images = post.image

  console.log(images, "images from update form")

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

  const submitHandler = async () => {
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
                                <textarea
                                  type="text"
                                  name='caption'
                                  value={caption}
                                  onChange={ e => setCaption(e.target.value)}
                                >
                                </textarea>
                                <button>Done</button>

                              </form>
                            </div>
                        </div>

                    </div>

            </div>
        </div>

  )
}

export default UpdatePostForm
