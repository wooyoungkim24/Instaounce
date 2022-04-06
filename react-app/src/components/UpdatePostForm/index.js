import './UpdatePostForm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UpdatePostFormCard = ({ post }) => {
  const [currentImage, setCurrentImage] = useState(post.image)
  const [caption, setCaption] = useState(post.caption)
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
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                        </div>

                        <div className='comment-card-icon-tray' >
                            <div className='home-card-icon-tray-top-left'>
                                <LikeIcon likes={likes} postId={post.id} />
                                <i className="fa-regular fa-comment fa-flip-horizontal  comment-icon"></i>
                            </div>
                            {images.length > 1 &&
                                <div className='home-card-icon-tray-dots'>
                                    {images.map((image, index) => (
                                        <i key={index} className={activeDotClass(index)}></i>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className='comment-card-likes-tray'>
                            {likes.length} likes
                        </div>
                        <div className='comment-card-caption-area'>
                                <img src={user.profile_image}></img>
                            <Link to={`/users/${user.id}`} className="home-card-username-bottom">{user.username}</Link>
                            <div  id="caption-container">
                                {post.caption}
                                <div id='date-time'>{post.updated_at}</div>
                            </div>
                        </div>
  
                    </div>

            </div>
        </div>

  )
}
