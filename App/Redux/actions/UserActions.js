import User from "@services/User"
import wp from "@services/WPAPI"
import fetch from "./fetch"
import { Constants } from "@common"

import {
  FETCH_USER_SUCCESS, CLEAR_USER_SUCCESS,
  FETCH_POST_BY_USER_SUCCESS,
  FETCH_POSTS_USER_MORE,
  FINISH_INTRO
} from '@redux/types';

export const fetchUserData = () => {
  return dispatch => {
    User.getUser().then(data => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: data });
    });
  }
};

export const fetchPostsByUser = (id, page, token) => {
  let limit = Constants.PagingLimit;
  const api = wp.posts()
    .setHeaders('Authorization', 'Bearer ' + token)
    .author(id)
    .status("draft,publish")
    .perPage(limit)
    .page(page).embed();

  return (dispatch) => {
    if (page == 1) {
      return fetch(dispatch, api, FETCH_POST_BY_USER_SUCCESS);
    }
    return fetch(dispatch, api, FETCH_POSTS_USER_MORE);
  }
}

export const clearUserData = () => {
  return (dispatch) => dispatch({ type: CLEAR_USER_SUCCESS });
};

export const finishIntro = () => {
  return (dispatch) => dispatch({ type: FINISH_INTRO });
};
