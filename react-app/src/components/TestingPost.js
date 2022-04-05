
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import { getFollowedPosts } from '../store/posts';

function TestingPost() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)

    const [posts, setPosts] = useState([]);


    const followedPosts = useSelector(state => {
        return state.feedState.followedPosts
    })
    useEffect(() => {
        dispatch(getFollowedPosts()).then(() => setIsLoaded(true))
    }, [dispatch])



    return (
        <div>
            {isLoaded &&
                <div>
                    {followedPosts.map((ele) => {
                        return (
                            <div key={ele.id}>
                                {ele?.user_id}
                            </div>
                        )
                    })}
                </div>}



        </div>
    )

}

export default TestingPost
