
import omit from 'lodash/omit';

/*
 * Action creators
 */
const RETRIEVE = 'comment/RETRIEVE_COMMENTS';
const ADD = 'comment/ADD';
const DELETE = 'comment/DELETE';
const START_EDITING = 'comment/START_EDITING';
const STOP_EDITING = 'comment/STOP_EDITING';
const SHOW_MODAL = 'comment/SHOW_MODAL';
const VOTE = 'comment/VOTE_COMMENT';
const SORT_BY = 'comment/SORT_BY';



/*
 * Reducer
 */



const INITIAL_STATE = {
  byId: {},
  sortBy: { key: 'voteScore', order: 'desc' },
  isModalOpen: false,
  editingCommentId: null
};

function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case SHOW_MODAL:
      return {
        ...state,
        isModalOpen: action.visibility
      }
    case STOP_EDITING:
      return {
        ...state,
        isModalOpen: null
      }
    case START_EDITING:
      return {
        ...state,
        editingCommentId: action.commentId
      }

    case RETRIEVE: {
      const commentsById = action.comments
        .reduce((comments, comment) =>
          (Object.assign(
            comments,
            {
              [comment.id]: comment
            }
          )), {});

      return {
        ...state,
        byId: commentsById
      };
    }
    case DELETE:
      return {
        ...state,
        byId: omit(state.byId, action.commentId)
      };
    case ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case SORT_BY:
      return {
        ...state,
        sortBy: { key: action.key, order: action.order }
      };
    default:
      return state;
  }
}

export default commentsReducer;
