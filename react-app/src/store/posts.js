
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';

const setFollowedPosts = (posts) => ({
    type: SET_FOLLOWED_POSTS,
    payload: posts
  });


export const getFollowedPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    if(response.ok){
        const followedPosts = await response.json()
        dispatch(setFollowedPosts(followedPosts))
    }
};

const initialState = {

}

export default function postsReducer(state = initialState, action) {
    const newState = {...state}

    switch (action.type) {

      case SET_FOLLOWED_POSTS:

        return { followedPosts: action.payload.posts }

      default:
        return state;
    }
  }
