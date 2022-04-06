
const SET_FOLLOWED_POSTS= 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';
const CREATE_COMMENT = 'session/CREATE_COMMENT'
const DELETE_COMMENT = 'session/DELETE_COMMENT'
const EDIT_COMMENT = 'session/EDIT_COMMENT'




const setFollowedPosts = (posts) => ({
    type: SET_FOLLOWED_POSTS,
    payload: posts
  });

const likeAPost = (like) => ({
  type: CREATE_LIKE,
  payload: like
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
    console.log(response)
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
        newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)
        return newState
        
        case CREATE_COMMENT:
        newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload
        return newState

      case DELETE_COMMENT:
        
        // console.log(newState.followedPosts)
        delete newState.followedPosts[action.payload.postId].comments[action.payload.commentId]

        return newState

      case EDIT_COMMENT:
        newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload
        return newState
        // const comments = newState.followedPosts[action.payload['post_id']].comments
        // const edited = comments.find(comment => comment.id === action.payload.comment["id"])
        // comments[edited] = action.payload.comment

        // return newState

      default:
        return state;
    }
  }
