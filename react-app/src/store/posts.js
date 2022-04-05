
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';

const setFollowedPosts = (posts) => ({
    type: SET_FOLLOWED_POSTS,
    payload: posts
  });

const likeAPost = (postId) => ({
  type: CREATE_LIKE,
  payload: postId
})


export const getFollowedPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    if(response.ok){
        const followedPosts = await response.json()
        dispatch(setFollowedPosts(followedPosts))
    }
};

export const like = () => async(dispatch) => {

}

const initialState = {

}

export default function postsReducer(state = initialState, action) {
    const newState = {...state}

    switch (action.type) {

      case SET_FOLLOWED_POSTS:
        const posts = action.payload.posts.forEach(post => {
          newState[post.id] = post
        })
        return { followedPosts: newState }

      case CREATE_LIKE:
        return { }

      default:
        return state;
    }
  }
