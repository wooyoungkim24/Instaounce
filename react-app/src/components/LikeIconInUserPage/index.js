import './LikeIconInUserpage.css';
import { useSelector, useDispatch } from 'react-redux'
import { newlike, unlike } from '../../store/userPages';
import { useState } from 'react';

const LikeIconInUserPage = ({ likes, postId }) => {
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
        dispatch(newlike(postId)).then(() => setUserLikes(true))
    };

    const deleteLikeHandler = () => {
        // dispatch(deleteLike(postId)).then(() => setUserLikes(false))
        // console.log()
        console.log("hey")
        // dispatch(unlike(currentUserLike)).then(() => setUserLikes(false))
        dispatch(unlike(postId, currentUserLike?.id, currentUserLike.user_id)).then(() => setUserLikes(false))
    }

    return (
        <>
            {userLikes || foundLikes ?
                <i className="fa-solid fa-heart heart-icon-liked" onClick={deleteLikeHandler}  ></i> :
                <i className="fa-regular fa-heart heart-icon-notliked" onClick={() => createLikeHandler()}></i>
            }
        </>
    )

}
export default LikeIconInUserPage;
