import './HomeFeed.css';
import '../PageNotFound/PageNotFound.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedPosts } from '../../store/posts';
import HomeFeedCard from '../HomeFeedCard';

const HomeFeed = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)


    const followedPosts = useSelector(state => state.feedState);
    const followedPostsArr = Object.values(followedPosts.followedPosts);

    useEffect(() => {
        dispatch(getFollowedPosts()).then(() => setIsLoaded(true))
    }, [dispatch])



    return (
        <div className='home-feed-body'>
            {isLoaded && followedPostsArr.length > 0 &&
                <div className='home-feed-list'>
                    {followedPostsArr.reverse().map(post => (
                        <HomeFeedCard key={post.id} post={post} />
                    ))}
                </div>
            }
            {isLoaded && !followedPostsArr.length &&
                <div className='page-not-found-body'>
                    <div className='page-not-found-header'>
                        Woah! You aren't following anyone.
                    </div>
                    <div className='page-not-found-body-text'>
                        If you're looking for people to follow, checkout the 
                        <Link to='/explore' className='page-not-found-link-text'> explore page.</Link>
                    </div>
                </div>
            }

        </div>
    )
};

export default HomeFeed;