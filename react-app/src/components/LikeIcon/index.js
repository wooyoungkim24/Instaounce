import './LikeIcon.css';
import { useSelector } from 'react-redux'

const LikeIcon = ({likes}) => {

    const userId = useSelector(state => state.session.user['id'])
    const foundLikes = likes.find(like => like.user_id === userId)

    // console.log(foundLikes)
    return (
        
        <div>
         {foundLikes ? 
             <i class="fa-solid fa-heart"></i>  :
             <i className="fa-regular fa-heart heart-icon"></i> 
         }
        </div>


    )
}
export default LikeIcon;