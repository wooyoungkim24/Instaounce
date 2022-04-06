

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




// ======================= COMMENTS ===================

const CREATE_COMMENT = 'session/CREATE_LIKE';
const UPDATE_COMMENT = 'session/UPDATE_COMMENT';
const DELETE_COMMENT = 'session/DELETE_COMMENT';


const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    payload: comment
});

export const postComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/posts/${comment.postId}/comments`, {
        method: "POST",
        headers: {"Content-Type": "Application/JSON"},
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const comment = await res.json()
        await dispatch(createComment(comment));
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

const CREATE_LIKE = 'session/CREATE_LIKE';
const DELETE_LIKE = 'session/DELETE_LIKE';

const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like
});

const deleteLike = (like) => ({
    type: DELETE_LIKE,
    payload: like
});

export const like = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(postId)
    });

    if (res.ok) {
        const newLike = await res.json();
        await dispatch(createLike(newLike));
    };
};

export const unlike = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: "DELETE"
    });

    if (res.ok) {
        const deletedLike = await res.json();
        await dispatch(deleteLike(deletedLike));
    };
};



const initialState = {};

export default function userPageReducer(state = initialState, action) {
    const newState = { ...state };

    switch (action.type) {

        case GET_USER_PAGE:
            newState[action.payload.id] = action.payload;
            return newState;

        case CREATE_POST:
            newState[action.payload.userId][action.payload.posts][action.payload.id] = action.payload;
            return newState;
        
        case UPDATE_POST:
            newState[action.payload.userId][action.payload.posts][action.payload.id] = action.payload;
            return newState

        case DELETE_POST:
            delete newState[action.payload.userId][action.payload.posts][action.payload.id];
            return newState

        case CREATE_COMMENT:
            newState[action.payload.userId][action.payload.posts][action.payload.id] = action.payload;
            return newState;
            
        default:
            return state;
    };
};