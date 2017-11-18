import * as API from "../../utils/api";
import uuid from 'uuid/v4';
import orderBy from 'lodash/orderBy';


/*
 * Action creators
 */
const RETRIEVE = 'comment/RETRIEVE_COMMENTS';
const ADD = 'comment/ADD';
const DELETE = 'comment/DELETE';
const START_EDITING = 'comment/START_EDITING';
const STOP_EDITING = 'comment/STOP_EDITING';
const SHOW_MODAL= 'comment/SHOW_MODAL';
const VOTE = 'comment/VOTE_COMMENT';
const SORT_BY = 'comment/SORT_BY';

export function getAllComments(postId) {
  return (dispatch) => {
    API.getCommentsFromPost(postId)
      .then(comments => dispatch({ type: RETRIEVE, comments }));
  };
}

export function upsertComment() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.comment.values;

    if (values.id) {
      const comment = {...values, timestamp: Date.now()};

      API.updateComment(comment)
        .then((comment) => {
          dispatch({ type: ADD, comment });
          });
    } else {
      const comment = {
        id: uuid(),
        timestamp: Date.now(),
        parentId: values.postId,
        author: values.author,
        body: values.body
      };

      API.addComment(comment)
        .then((comment) => {
          dispatch({ type: ADD, comment });
        });
    }
  }
}

export function voteComment(commentId, option) {
  return (dispatch) => {
    API.voteComment(commentId, option)
      .then((comment) => {
        dispatch({ type: VOTE, comment });
      });
  };
}

export function deleteComment(commentId) {
  return (dispatch) => {
    API.deleteComment(commentId)
      .then(() => {
        dispatch({ type: DELETE, commentId });
      });
  };
}

export function startEditingComment(commentId) {
  return (dispatch) => {
    dispatch({ type: START_EDITING, commentId });
    // dispatch({ type: MODAL_VISIBILITY, visibility: true });
    dispatch({ type: SHOW_MODAL, visibility: true });

  };
}

export function sortCommentsBy(key, order) {
  return { type: SORT_BY, key, order };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({ type: STOP_EDITING });
    dispatch({ type: SHOW_MODAL, visibility });

  };
}


export function commentsReorder(state) {
  const notDeleted = Object.values(state.byId).filter((comment) => !comment.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export function editingCommentSelector(state) {
  return state.byId[state.editingCommentId]
}

