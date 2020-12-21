import {
  TAG_FETCH_SUCCESS,
  TAG_ON_SELECT,
} from '@redux/types';

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  selectedTag: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TAG_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        list: action.payload
      }
    case TAG_ON_SELECT:
      return {
        ...state,
        selectedTag: action.payload || null
      }
    default:
      return state;
  }
}