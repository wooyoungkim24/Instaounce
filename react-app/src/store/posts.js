
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';


const setFollowedPosts = (posts) => ({
    type: SET_FOLLOWED_POSTS,
    payload: posts
  });

// original
// const likeAPost = (like) => ({
//   type: CREATE_LIKE,
//   payload: like
// })

//
const likeAPost = (like) => ({
  type: CREATE_LIKE,
  payload: like
})

const cancelLike = (likeId, postId) => ({
  type: DELETE_LIKE,
  likeId,
  postId
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

// original
// export const like = (postId) => async(dispatch) => {
//   const response = await fetch(`/api/posts/${postId}/likes`, {
//     method: "POST",
//     headers: {"Content-type": "application/json"},
//     body: JSON.stringify(postId)
//   })

//   if (response.ok) {
//     const newLike = await response.json()
//     // console.log("NEW LIKE", newLike)
//     await dispatch(likeAPost(newLike))
//   };
// };

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

export const deleteLike = (postId, likeId) => async(dispatch) => {
  console.log("inside of deletelike")
  console.log("likeId", likeId)
  const response = await fetch(`/api/posts/${postId}/likes/`, {
    method: "DELETE"
  })

  if (response.ok) {
    // const like = await response.json()
    console.log("want to deleted like id", likeId)
    await dispatch(cancelLike(likeId, postId))
  }
}

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
          console.log("action.payload", action.payload)
          // original: (likes in the state is undefined)
          // newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)

          console.log("likes before create", newState.followedPosts[action.payload['post_id']].likes)
          newState.followedPosts[action.payload['post_id']].likes.push(action.payload)
          console.log("likes after create", newState.followedPosts[action.payload['post_id']].likes)

        return newState

      case DELETE_LIKE:

          // console.log("heyehoeh", newState.followedPosts)
          delete newState.followedPosts[action.postId].likes[action.likeId]
          // console.log("action.postId", action.postId)
          // console.log("action.likeId", action.likeId)
          const likes = newState.followedPosts[action.postId].likes
          console.log("likes before delete", likes)

          const filteredLikes = likes.filter(like => like.id !== action.likeId)
          console.log("filteredlikes", filteredLikes)

          newState.followedPosts[action.postId].likes = filteredLikes
          console.log("likes after delete", newState.followedPosts[action.postId].likes)
          return newState

      default:
        return state;
    }
  }
