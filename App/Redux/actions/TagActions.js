import wp from '@services/WPAPI';
import fetch from './fetch';

import {
  TAG_FETCH_SUCCESS,
  TAG_ON_SELECT,
} from '@redux/types';


export const fetchTags = () => {
  const api = wp.tags();

  return (dispatch) => fetch(dispatch, api, TAG_FETCH_SUCCESS);
};

export const setActiveTag = (id) => {
  return (dispatch) => {
    dispatch({type: TAG_ON_SELECT, payload: id})
  }
}
