
const SET_FOLLOWED_POSTS = 'session/SET_FOLLOWED_POSTS';
const CREATE_LIKE = 'session/CREATE_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';
// const GET_COMMENTS = 'session/GET_COMMENTS';
const CREATE_COMMENT = 'session/CREATE_COMMENT'
const DELETE_COMMENT = 'session/DELETE_COMMENT'
const EDIT_COMMENT = 'session/EDIT_COMMENT'
const REMOVE_FOLLOWED = 'session/REMOVE_FOLLOWED'
const UPDATE_A_POST = 'session/UPDATE_A_POST'
const CREATE_POST = "session/CREATE_POST"

export const removePosts = (userId) => ({
  type: REMOVE_FOLLOWED,
  payload: userId
})

const createNewPost = (post) =>({
  type: CREATE_POST,
  payload: post
})

const setFollowedPosts = (posts) => ({
  type: SET_FOLLOWED_POSTS,
  payload: posts
});

const updatePost = (post) => ({
  type: UPDATE_A_POST,
  payload: post
})

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


export const createComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/posts/comments`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const comment = await response.json()
    await dispatch(makeComment(comment))
    return null
  }else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/posts/comments/${commentId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    console.log('ttestsetsetsts')
    const comment = await response.json()
    console.log('comment obj', comment)
    dispatch(commentDelete(comment))

    return comment
  }
}

export const editComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/posts/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })

  if (response.ok) {
    const comment = await response.json()
    await dispatch(commentEdit(comment))
    return comment
  }
}


export const createPost = (payload) => async (dispatch) => {

  const response = await fetch('/api/posts/', {
    method: "POST",
    body: payload
  })

  if (response.ok) {
    const image = await response.json();
    dispatch(createNewPost(image))
    return image
  }
}

export const editPost = (payload) => async dispatch => {
  const response = await fetch(`/api/posts/${payload.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const post = await response.json();
    await dispatch(updatePost(post));

  }
}

export const getFollowedPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts/');
  if (response.ok) {
    const followedPosts = await response.json();
    await dispatch(setFollowedPosts(followedPosts));
  };
};



export const like = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(postId)
  });

  if (response.ok) {
    const newLike = await response.json()
    await dispatch(likeAPost(newLike))
  };
};

export const deleteLike = (postId, likeId) => async (dispatch) => {
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

const initialState = { followedPosts: {}, explorePosts: {} }

export default function postsReducer(state = initialState, action) {
  const newState = { ...state }

    switch (action.type) {
      // case UPDATE_A_POST:
      //   newState.pageState

      //   return

    case SET_FOLLOWED_POSTS:
      action.payload.posts.forEach(post => {
        newState.followedPosts[post.id] = post
      })
      return newState

      // case CREATE_LIKE:
      //   newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)
      //   return newState

    case CREATE_COMMENT:
      newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload

      return newState

    case CREATE_LIKE:
      // console.log("action.payload", action.payload)
      // original: (likes in the state is undefined)
      // newState.followedPosts[action.payload['post_id']].likes.push(action.payload.like)

      // console.log("likes before create", newState.followedPosts[action.payload['post_id']].likes)
      newState.followedPosts[action.payload['post_id']].likes.push(action.payload)
      // console.log("likes after create", newState.followedPosts[action.payload['post_id']].likes)

      return newState

    case DELETE_COMMENT:
      if(Object.values(newState.followedPosts).length){
        delete newState.followedPosts[action.payload.postId].comments[action.payload.commentId]
      }
      return newState

    case EDIT_COMMENT:
      // console.log('testing', newState.followedPosts)
      if(Object.values(newState.followedPosts).length){
        newState.followedPosts[action.payload['post_id']].comments[action.payload.id] = action.payload
      }

      return newState

    case CREATE_POST:
      newState.followedPosts[action.payload.feedState.id] = action.payload.feedState
      return newState

    case DELETE_LIKE:
      // console.log("heyehoeh", newState.followedPosts)
      delete newState.followedPosts[action.postId].likes[action.likeId]
      // console.log("action.postId", action.postId)
      // console.log("action.likeId", action.likeId)
      const likes = newState.followedPosts[action.postId].likes
      // console.log("likes before delete", likes)

      const filteredLikes = likes.filter(like => like.id !== action.likeId)
      // console.log("filteredlikes", filteredLikes)

      newState.followedPosts[action.postId].likes = filteredLikes
      // console.log("likes after delete", newState.followedPosts[action.postId].likes)
      return newState

    case REMOVE_FOLLOWED:
      state = Object.values(newState.followedPosts).filter(post => {
        return post.user_id !== action.payload
      })
      newState.followedPosts = {...state};
      return newState
    default:
      return state;
  }
}
