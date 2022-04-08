import './LikeIconInUserpage.css';
import { useSelector, useDispatch } from 'react-redux'
import { newlike, unlike } from '../../store/userPages';
import { useState } from 'react';

const LikeIconInUserPage = ({ likes, postId, user }) => {
    const [userLikes, setUserLikes] = useState()
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user['id']);
    const postOwnerId = user.id

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

        dispatch(unlike(postId, currentUserLike?.id, postOwnerId)).then(() => setUserLikes(false))
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
