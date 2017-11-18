import * as API from "../utils/api";
import uuid from 'uuid/v4';
import orderBy from 'lodash/orderBy';



export const POST_ACTION = {
    RETRIEVE : 'post/RETRIEVE',
    RETRIEVE_FROM_CATEGORY : 'post/RETRIEVE_FROM_CATEGORY',
    RETRIEVE_COMMENTS_COUNT : 'post/RETRIEVE_COMMENTS_COUNT',
    ADD : 'post/ADD',
    SORT_BY : 'post/SORT_BY',
    DELETE : 'post/DELETE',
    START_EDITING : 'post/START_EDITING',
    STOP_EDITING : 'post/STOP_EDITING',
    VOTE : 'post/VOTE_POST',
    SHOW_MODAL : 'post/SHOW_MODAL'
  }
  ;

  export function getPostCommentsCount(postId) {
    return (dispatch) => {
      API.getCommentsFromPost(postId)
        .then(comments => dispatch({
          type: POST_ACTION.RETRIEVE_COMMENTS_COUNT, postId,
          commentsCount: comments.length
        }));
    };
  }
  
  export function getPostActCreat(postId) {
    return (dispatch) => {
      API.getPost(postId)
        .then(post => dispatch({type: POST_ACTION.RETRIEVE, postId, post}));
    };
  }

export function postByCategory(categoryPath) {
  return (dispatch) => {
    API.getPostsFromCategory(categoryPath)
      .then((posts) => {
        dispatch({type: POST_ACTION.RETRIEVE_FROM_CATEGORY, posts});

        posts.map(post => dispatch(getPostCommentsCount(post.id)));
      });
  };
}


export function startEditingPost(postId) {
  return (dispatch) => {
    dispatch({type: POST_ACTION.START_EDITING, postId});
    dispatch({type: POST_ACTION.SHOW_MODAL, visibility: true});

  };
}

export function sortPostsBy(key, order) {
  return {type: POST_ACTION.SORT_BY, key, order};
}

export function votePost(postId, option) {
  return (dispatch) => {
    API.votePost(postId, option)
      .then((post) => {
        dispatch({type: POST_ACTION.VOTE, post});
      });
  };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({type: POST_ACTION.STOP_EDITING});
    //dispatch({type: MODAL_VISIBILITY, visibility});
    dispatch({type: POST_ACTION.SHOW_MODAL, visibility});
  };
}

export function deletePost(postId, category) {
  return (dispatch) => {
    API.deletePost(postId)
      .then(() => {
        dispatch({type: POST_ACTION.DELETE, postId});
      });
  };
}


export function handlePostForm() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.post.values;

    if (values.id) {
      // Editing existing comment
      const post = {...values, timestamp: Date.now()};

      API.updatePost(post)
        .then((post) => {
          dispatch({type: POST_ACTION.ADD, post});
        });
    } else {
      // Creating a new comment
      const post = {
        id: uuid(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category
      };

      API.addPost(post)
        .then((post) => {
          dispatch({type: POST_ACTION.ADD, post});
        });
    }
  }
}

export function postSelector(state, postId) {
  return state.byId[postId];
}

export function postTOedit(state) {
  return state.byId[state.editingPostId]
}
export function postReorder(state) {
  const notDeleted = Object.values(state.byId).filter((post) => !post.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}
