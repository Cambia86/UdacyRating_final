import omit from 'lodash/omit';
import { POST_ACTION } from './functionsCreator'

/*
 * Reducer
 */

const INITIAL_STATE = {
  byId: {},
  editingPostId: null,
  sortBy: { key: 'voteScore', order: 'desc' },
  selected: null,
  isModalOpen: false
};

export default function postsReducer(state = INITIAL_STATE, action) {
  // let updatedInfo;
  switch (action.type) {
    case POST_ACTION.ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        }
      }
    case POST_ACTION.RETRIEVE_FROM_CATEGORY: {
      const postsById = action.posts
        .reduce((posts, post) => (Object.assign(posts,
          {
            [post.id]: post
          })
        ), {});

      return {
        ...state,
        byId: {
          ...postsById
        }
      }
    }
    case POST_ACTION.RETRIEVE_COMMENTS_COUNT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.postId]: {
            ...state.byId[action.postId],
            commentsCount: action.commentsCount
          }
        }
      }

    case POST_ACTION.VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: {
            ...state.byId[action.post.id],
            voteScore: action.post.voteScore
          }
        }
      }
    case POST_ACTION.RETRIEVE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        },
        selected: action.postId
      };
    case POST_ACTION.SORT_BY:
      return Object.assign({}, state,
        {
          sortBy: {
            key: action.key, order: action.order
          }
        });
    case POST_ACTION.DELETE:
      return {
        ...state,
        byId: omit(state.byId, action.postId)
      };

    case POST_ACTION.START_EDITING:
      return {
        ...state,
        editingPostId: action.postId
      }
    case POST_ACTION.STOP_EDITING:
      return {
        ...state,
        editingPostId: null
      }
    case POST_ACTION.SHOW_MODAL:
      return{
        ...state,
        isModalOpen: action.visibility 
      }
    default:
      return state;
  }
}
