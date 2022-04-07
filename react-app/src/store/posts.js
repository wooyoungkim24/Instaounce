
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';
const GET_COMMENTS = 'session/GET_COMMENTS';
const CREATE_COMMENT = 'session/CREATE_COMMENT'
const DELETE_COMMENT = 'session/DELETE_COMMENT'
const EDIT_COMMENT = 'session/EDIT_COMMENT'




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

const commentDelete = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})

const commentEdit = (comment) => ({
  type: EDIT_COMMENT,
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
    const comment = await response.json()
    await dispatch(makeComment(comment))
  }
}

export const deleteComment = (commentId) => async(dispatch) => {
  const response = await fetch(`api/posts/comments/${commentId}`,{
    method: "DELETE"
  })
  if (response.ok){
    const comment = await response.json()
    dispatch(commentDelete(comment))
  }
}

export const editComment = (comment) => async(dispatch) => {
  const response = await fetch(`/api/posts/comments/${comment.id}`,{
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })

  if(response.ok){
    const comment = await response.json()
    await dispatch(commentEdit(comment))
  }
}


export const createPost = (payload) => async(dispatch) => {

  const response = await fetch('/api/posts/', {
    method: "POST",
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
        newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)
        return newState
        
        case CREATE_COMMENT:
        newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload
        return newState

      case DELETE_COMMENT:
        delete newState.followedPosts[action.payload.postId].comments[action.payload.commentId]
        return newState

      case EDIT_COMMENT:
        newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload
        return newState

      default:
        return state;
    }
  }
