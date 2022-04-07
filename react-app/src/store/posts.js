
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';
const GET_COMMENTS = 'session/GET_COMMENTS';
const CREATE_COMMENT = 'session/CREATE_COMMENT'




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
const makeComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})


export const createComment = (comment) => async(dispatch) => {
  const response = await fetch(`/api/posts/comments`,{
    method:"POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })
  if (response.ok){
    console.log(response)
    const comment = await response.json()
    await dispatch(makeComment(comment))
  }
}


export const createPost = (payload) => async(dispatch) => {

  const response = await fetch('/api/posts/', {
    method: "POST",
    // headers: {"Content-type": "application/JSON"},
    body: payload
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

          newState.followedPosts[action.payload['post_id']].likes.push(action.payload)

        return newState

      case DELETE_LIKE:
          delete newState.followedPosts[action.postId].likes[action.likeId]
          const likes = newState.followedPosts[action.postId].likes

          const filteredLikes = likes.filter(like => like.id !== action.likeId)

          newState.followedPosts[action.postId].likes = filteredLikes
          return newState
          
      case CREATE_COMMENT:
        newState.followedPosts[action.payload['post_id']].comments.push(action.payload.comment)
        return newState

        // const post_id = action.payload.comment.post_id
        // const newArr = [action.payload.comment, ...state[post_id].followedPosts.comments.all] 
        // console.log(action.payload)
        // const newComment = {
        //   ...action.payload.comment,
        // }
        // return {
        //   ...state,
        //   [post_id]: {
        //     ...state[post_id].comments,
        //     [action.payload.comment.id]: newComment,
        //     comments: newArr
        //   }
        // }

      default:
        return state;
    }
  }
