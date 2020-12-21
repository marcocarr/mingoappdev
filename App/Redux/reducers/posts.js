import {
  STICKY_FETCH_SUCCESS,
  POST_FETCH_SUCCESS,
  POST_FETCH_MORE,
  FETCH_PENDING,
  VIDEO_FETCH_SUCCESS,
  PHOTO_FETCH_SUCCESS,
  POST_RELATED_FETCH_SUCCESS,
  POST_CHANGE_LAYOUT_SUCCESS,
  VIDEO_FETCH_MORE,
  PHOTO_FETCH_MORE,
  SEARCH_POSTS_SUCCESS,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL
} from '@redux/types';

import { flatten, pickBy, identity } from 'lodash'

const initialState = {
  isFetching: true,
  postFinish: false,
  error: null,
  list: [],
  sticky: [],

  // need refactor
  videos: [],
  photos: [],
  related: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case POST_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        list: flatten(action.payload)
      }

    case POST_FETCH_MORE:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        list: state.list.concat(flatten(action.payload))
      }

    case VIDEO_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        videos: flatten(action.payload)
      }
    case VIDEO_FETCH_MORE:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        videos: state.videos.concat(flatten(action.payload))
      }

    case PHOTO_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        photos: flatten(action.payload)
      }

    case PHOTO_FETCH_MORE:
      return {
        ...state,
        error: null,
        postFinish: action.finish,
        isFetching: false,
        photos: state.photos.concat(flatten(action.payload))
      }
    case POST_CHANGE_LAYOUT_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        layout: action.layout
      }


    case STICKY_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        sticky: action.payload
      }


    case POST_RELATED_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        related: action.payload
      }
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        postsInSearch: action.payload
      }
      case CREATE_POST_PENDING:
          return {
            ...state,
            type: action.type
          }

        case CREATE_POST_SUCCESS:
          return {
            ...state,
            type: action.type
          }

        case CREATE_POST_FAIL:
          return {
            ...state,
            type: action.type,
            message: action.message
          }
    default:
      return state;
  }
};
