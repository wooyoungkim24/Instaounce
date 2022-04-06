import './LikeIcon.css';
import { useSelector, useDispatch } from 'react-redux'
import { like, deleteLike } from '../../store/posts';
import { useState } from 'react';

const LikeIcon = ({ likes, postId }) => {
    const [userLikes, setUserLikes] = useState()
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user['id']);

    const foundLikes = likes.find(like => like?.user_id === userId);
    // if (foundLikes) setUserLikes(true);

    // find the like which has user_id == session user id && postId = postId
    // pass the id of the like into dispatch
    //
    const currentUserLike = likes.find(like => like?.user_id === userId && like?.post_id === postId)

    const createLikeHandler = () => {
        dispatch(like(postId)).then(() => setUserLikes(true))
    };

    const deleteLikeHandler = () => {
        // dispatch(deleteLike(postId)).then(() => setUserLikes(false))
        console.log()
        dispatch(deleteLike(postId, currentUserLike.id))
    }

    return (

        <div>
            {userLikes || foundLikes ?
                <i class="fa-solid fa-heart"></i> :
                <i className="fa-regular fa-heart heart-icon" onClick={() => createLikeHandler()}></i>
            }
            <button type="submit" onClick={createLikeHandler}>LIKE</button>
            <button type="submit" onClick={deleteLikeHandler}>DELETE</button>
        </div>


    )
}
export default LikeIcon;
