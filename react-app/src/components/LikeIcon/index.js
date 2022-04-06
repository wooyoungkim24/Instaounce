import './LikeIcon.css';
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../../store/posts';
import { useState } from 'react';

const LikeIcon = ({ likes, postId }) => {
    const [userLikes, setUserLikes] = useState()
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user['id']);

    const foundLikes = likes.find(like => like?.user_id === userId);
    // if (foundLikes) setUserLikes(true);

    const createLikeHandler = () => {
        dispatch(like(postId)).then(() => setUserLikes(true))
    };

    return (

        <div>
            {userLikes || foundLikes ?
                <i className="fa-solid fa-heart"></i> :
                <i className="fa-regular fa-heart heart-icon" onClick={() => createLikeHandler()}></i>
            }
        </div>


    )
}
export default LikeIcon;