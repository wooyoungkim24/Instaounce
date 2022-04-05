
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';





const setFollowedPosts = (posts) => ({
    type: SET_FOLLOWED_POSTS,
    payload: posts
  });

const likeAPost = (like) => ({
  type: CREATE_LIKE,
  payload: like
})

export const createPost = (payload) => async(dispatch) => {

  const response = await fetch('/api/posts/', {
    method: "POST",
    // headers: {"Content-type": "application/JSON"},
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    
  }
}

export const getFollowedPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/')
    if(response.ok){
        const followedPosts = await response.json()
        await dispatch(setFollowedPosts(followedPosts))
    }
};

export const like = (postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(postId)
  })

  if (response.ok) {
    const newLike = await response.json()
    // console.log("NEW LIKE", newLike)
    await dispatch(likeAPost(newLike))
  };
};

const initialState = { followedPosts: {}, posts: {}}

export default function postsReducer(state = initialState, action) {
    const newState = {...state}

    switch (action.type) {

      case SET_FOLLOWED_POSTS:
        action.payload.posts.forEach(post => {
          newState.followedPosts[post.id] = post
        })
        return newState

      case CREATE_LIKE:
          console.log(action.payload)
          newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)
        return newState

      default:
        return state;
    }
  }
