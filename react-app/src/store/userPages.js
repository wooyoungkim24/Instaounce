

const GET_USER_PAGE = 'session/GET_USER_PAGE';

const getUserPage = (page) => ({
    type: GET_USER_PAGE,
    payload: page
});

export const loadUserPage = (userId) => async(dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const page = await res.json();
        await dispatch(getUserPage(page));
    };
};



// ======================= POSTS ===================

const CREATE_POST = 'session/CREATE_POST';
const UPDATE_POST = 'session/UPDATE_POST';
const DELETE_POST = 'session/DELETE_POST';

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    payload: post
});

const deletePost = (post) => ({
    type: DELETE_POST,
    payload: post
});

export const newPost = (payload) => async (dispatch) => {
    const res = await fetch('/api/posts/', {
        method: "POST",
        body: payload
    });

    if (res.ok) {
        const post = res.json()
        await dispatch(createPost(post))
    };
};

// original:
// export const editPost = (payload) => async (dispatch) => {
//     const res = await fetch(`/api/posts/${payload.postId}`, {
//         method: "PUT",
//         body: payload
//     });

//     if (res.ok) {
//         const post = res.json()
//         await dispatch(updatePost(post))
//     };
// };

export const editPost = (payload) => async dispatch => {
    const response = await fetch(`/api/posts/${payload.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const post = await response.json();
      await dispatch(updatePost(post));

    }
  }

export const removePost = (payload) => async (dispatch) => {
    const res = await fetch(`/api/posts/${payload.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const post = await res.json()
        await dispatch(deletePost(post))
    };
};




// ======================= COMMENTS ===================

const ADD_COMMENT = 'userPages/ADD_COMMENT';
const UPDATE_COMMENT = 'userPages/UPDATE_COMMENT';
const REMOVE_COMMENT = 'userPages/DELETE_COMMENT';


const createComment = (comment, postOwnerId) => ({
    type: ADD_COMMENT,
    payload: comment,
    postOwnerId
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});

const deleteComment = (comment) => ({
    type: REMOVE_COMMENT,
    payload: comment
});

// original
// export const postComment = (comment) => async (dispatch) => {
//     const res = await fetch(`/api/posts/${comment.postId}/comments`, {
//         method: "POST",
//         headers: {"Content-Type": "Application/JSON"},
//         body: JSON.stringify(comment)
//     });

//     if (res.ok) {
//         const comment = await res.json()
//         await dispatch(createComment(comment));
//     };
// };

export const postComment = (comment, postOwnerId) => async (dispatch) => {
    const res = await fetch(`/api/posts/comments`, {
        method: "POST",
        headers: {"Content-Type": "Application/JSON"},
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const comment = await res.json()
        await dispatch(createComment(comment, postOwnerId));
    };
};



export const editComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/posts/${comment.postId}/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const comment = await res.json()
        await dispatch(updateComment(comment));
    };
};

export const removeComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/posts/${comment.postId}/comments/${comment.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const comment = await res.json()
        await dispatch(deleteComment(comment));
    };
};



// ======================= LIKES ===================

const CREATE_NEW_LIKE = 'session/CREATE_NEW_LIKE';
const CANCEL_LIKE = 'session/CANCEL_LIKE';

const likeAction = (like, postOwnerId) => ({
    type: CREATE_NEW_LIKE,
    payload: like, postOwnerId
});

const unlikeAction = (likeId, postId, userId) => ({
    type: CANCEL_LIKE,
    likeId,
    postId,
    userId
});

export const newlike = (postId, postOwnerId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(postId)
    });

    if (res.ok) {
        const newLike = await res.json();
        await dispatch(likeAction(newLike, postOwnerId));
    };
};



export const unlike = (postId, likeId, userId) => async (dispatch) => {
    console.log("inside of unlike")
    console.log("likeId", likeId)
    const response = await fetch(`/api/posts/${postId}/likes/`, {
      method: "DELETE"
    })

    if (response.ok) {
      console.log("in the unlike fetch response")
    //   const like = await response.json()
    //   console.log("like in unlike thunk", like)
      console.log("want to deleted like id", likeId)
      await dispatch(unlikeAction(likeId, postId, userId))
    }
  }


// ======================= FOLLOWS ===================

const CREATE_FOLLOW = 'session/CREATE_FOLLOW';
const DELETE_FOLLOW = 'session/DELETE_FOLLOW';

const createFollow = (users) => ({
    type: CREATE_FOLLOW,
    payload: users
});

const deleteFollow = (users) => ({
    type: DELETE_FOLLOW,
    payload: users
});

export const follow = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/followers`, {
        method: "POST"
    });

    if (res.ok) {
        const users = await res.json();
        await dispatch(createFollow(users));
    };
};

export const unfollow = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/followers`, {
        method: "DELETE"
    });

    if (res.ok) {
        const users = await res.json();
        await dispatch(deleteFollow(users));
    };
};



// ======================= REDUCER ===================

const initialState = {};

export default function userPageReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {

        case GET_USER_PAGE:
            newState[action.payload.id] = action.payload;
            console.log("######## NEW USER STATE", newState[action.payload.id])
            return newState;

        case CREATE_FOLLOW:
            if (newState[action.payload.currentUser.id]) {
                newState[action.payload.currentUser.id].following[action.payload.user.id] = action.payload.user
            };
            newState[action.payload.user.id].followers[action.payload.currentUser.id] = action.payload.currentUser
            return newState;

        case DELETE_FOLLOW:
            console.log(action.payload)
            if (newState[action.payload.currentUserId]) {
                delete newState[action.payload.currentUserId].following[action.payload.userId]
            };
            delete newState[action.payload.userId].followers[action.payload.currentUserId]
            return newState;

        // case CREATE_POST:
        //     newState[action.payload.userId][action.payload.posts][action.payload.id] = action.payload;
        //     return newState;

        case UPDATE_POST:

            newState[action.payload.user_id].posts[action.payload.id] = action.payload;
            return newState

        case DELETE_POST:
            delete newState[action.payload.user_id].posts[action.payload.id];
            return newState

        case CREATE_NEW_LIKE:

            newState[action.postOwnerId].posts[action.payload.post_id].likes[action.payload.id] =  action.payload
            return newState

        case CANCEL_LIKE:

            delete newState[action.userId].posts[action.postId].likes[action.likeId];
            return newState

        case ADD_COMMENT:
            newState[action.postOwnerId].posts[action.payload.post_id].comments[action.payload.id] = action.payload;
            return newState;

        default:
            return state;
    };
};
