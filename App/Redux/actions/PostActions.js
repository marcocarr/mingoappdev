import wp from "@services/WPAPI";
import { Constants, Config, AppConfig } from "@common";
import User from "@services/User";
import fetch from "./fetch";
import ApiClient from "@services/apiClient";
import _ from "lodash";

const Api = new ApiClient({
  baseUrl: AppConfig.URL.root
});

import {
  POST_FETCH_SUCCESS,
  STICKY_FETCH_SUCCESS,
  FETCH_PENDING,
  VIDEO_FETCH_SUCCESS,
  PHOTO_FETCH_SUCCESS,
  POST_RELATED_FETCH_SUCCESS,
  POST_CHANGE_LAYOUT_SUCCESS,
  POST_FETCH_MORE,
  VIDEO_FETCH_MORE,
  PHOTO_FETCH_MORE,
  FETCH_POST_BOOKMARK_SUCCESS,
  SEARCH_POSTS_PENDING,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAIL,
  POST_TAG_FETCH_MORE,
  POST_TAG_FETCH_SUCCESS,
  INIT_POSTS,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL
} from "@redux/types";

const checkCategories = categories => {
  var isAllow = false;
  if (Constants.includeCategories.length > 0) {
    if (categories) {
      if (Array.isArray(categories)) {
        isAllow =
          _.findIndex(
            categories,
            item => Constants.includeCategories.indexOf(item) > -1
          ) > -1;
      } else {
        isAllow = Constants.includeCategories.indexOf(categories) > -1;
      }
    }
  } else {
    isAllow = true;
  }

  return isAllow;
};

export const fetchPosts = (
  page = 1,
  tags = null,
  categories = null,
  sticky = false
) => {
  const limit = Constants.PagingLimit;

  if (checkCategories(categories) || tags) {
    let api = wp
      .posts()
      .tags(tags)
      .categories(categories)
      .excludeCategories(Constants.excludeCategories)
      .perPage(limit)
      .page(page)
      .embed()
      .sticky(sticky);

    return dispatch => {
      dispatch({ type: FETCH_PENDING });

      if (page == 1) {
        return fetch(dispatch, api, POST_FETCH_SUCCESS);
      }
      return fetch(dispatch, api, POST_FETCH_MORE, { tag: tags });
    };
  } else {
    return dispatch => {
      dispatch({ type: POST_FETCH_MORE, payload: [], extra: {}, finish: true });
    };
  }
};

export const fetchStickyPost = () => {
  const { sticky, tag, category } = Config.Banner;

  const api = wp
    .posts()
    .sticky(sticky)
    .tags(tag)
    .categories(category);

  return dispatch => fetch(dispatch, api, STICKY_FETCH_SUCCESS);
};

export const fetchVideos = page => {
  const limit = Constants.PagingLimit;

  const api = wp
    .posts()
    .categories([Config.CategoryVideo])
    .perPage(limit)
    .page(page);

  return dispatch => {
    dispatch({ type: FETCH_PENDING });

    if (page == 1) {
      return fetch(dispatch, api, VIDEO_FETCH_SUCCESS);
    }
    return fetch(dispatch, api, VIDEO_FETCH_MORE);
  };
};

export const fetchPhotos = page => {
  const limit = Constants.PagingLimit;
  const api = wp
    .posts()
    .perPage(limit)
    .page(page);

  return dispatch => {
    dispatch({ type: FETCH_PENDING });

    if (page == 1) {
      return fetch(dispatch, api, PHOTO_FETCH_SUCCESS);
    }
    return fetch(dispatch, api, PHOTO_FETCH_MORE);
  };
};

export const fetchPostsRelated = (page, categoryId, postCurrent) => {
  const api = wp
    .posts()
    .categories([categoryId])
    .exclude(postCurrent.id)
    .before(new Date(postCurrent.date))
    .page(page);
  return dispatch => fetch(dispatch, api, POST_RELATED_FETCH_SUCCESS);
};

export const fetchPostsBookmark = () => {
  return dispatch => {
    User.getPosts().then(data =>
      dispatch({ type: FETCH_POST_BOOKMARK_SUCCESS, payload: data })
    );
  };
};

export const changeLayout = (layout = Constants.Layout.default) => {
  return dispatch => {
    dispatch({ type: POST_CHANGE_LAYOUT_SUCCESS, layout: layout });
  };
};

export const searchPosts = searchText => {
  const api = wp.posts().search(searchText);

  return dispatch => fetch(dispatch, api, SEARCH_POSTS_SUCCESS);
};

export const fetchPostsByTag = (
  page = 1,
  tags = null,
  categories = null,
  index = 0
) => {
  const limit = Constants.PagingLimit;

  if (checkCategories(categories) || tags) {
    let api = wp
      .posts()
      .tags(tags)
      .categories(categories)
      .excludeCategories(Constants.excludeCategories)
      .perPage(limit)
      .page(page)
      .sticky(false);

    return dispatch => {
      dispatch({ type: FETCH_PENDING });
      if (page == 1) {
        return fetch(dispatch, api, POST_TAG_FETCH_SUCCESS, { index: index });
      }
      return fetch(dispatch, api, POST_TAG_FETCH_MORE, { index: index });
    };
  } else {
    return dispatch => {
      dispatch({
        type: POST_TAG_FETCH_SUCCESS,
        payload: [],
        extra: { index: index },
        finish: true
      });
    };
  }
};

export const initPosts = () => {
  return dispatch => dispatch({ type: INIT_POSTS });
};

export const createPost = (
  title,
  content,
  categories,
  filePath,
  token,
  onProgress
) => {
  return dispatch => {
    dispatch({ type: CREATE_POST_PENDING });
    console.log("createPost: ", {
      title,
      content,
      categories,
      filePath,
      token
    });

    //upload file
    let fileName = filePath.split("/").pop();
    Api.uploadFileWithProgress(
      "/wp-json/wp/v2/media",
      filePath,
      fileName,
      "file",
      {},
      onProgress,
      token
    )
      .then(({ statusCode, body }) => {
        if (statusCode == 201) {
          //submit post
          console.log({
            title,
            content,
            status: "draft",
            categories,
            featured_media: body.id
          });

          Api.post(
            "/wp-json/wp/v2/posts",
            {
              title,
              content,
              status: "draft",
              categories,
              featured_media: body.id
            },
            token
          )
            .then(({ statusCode, body }) => {
              if (statusCode == 201) {
                dispatch({ type: CREATE_POST_SUCCESS });
              } else {
                console.log({ statusCode, body });

                if (body.message != undefined) {
                  dispatch({ type: CREATE_POST_FAIL, message: body.message });
                } else {
                  dispatch({
                    type: CREATE_POST_FAIL,
                    message: Languages.errorMsgConnectServer
                  });
                }
              }
            })
            .catch(error => {
              console.log("POST ERROR: ", error);
              dispatch({
                type: CREATE_POST_FAIL,
                message: Languages.errorMsgConnectServer
              });
            });
        } else {
          console.log("UPLOAD: ", { statusCode, body });
          if (body.message != undefined) {
            dispatch({ type: CREATE_POST_FAIL, message: body.message });
          } else {
            dispatch({
              type: CREATE_POST_FAIL,
              message: Languages.errorMsgConnectServer
            });
          }
        }
      })
      .catch(error => {
        console.log("UPLOAD ERROR: ", error.response.data);
        if (error.response.data.message != undefined) {
          dispatch({
            type: CREATE_POST_FAIL,
            message: error.response.data.message
          });
        } else {
          dispatch({
            type: CREATE_POST_FAIL,
            message: Languages.errorMsgConnectServer
          });
        }
      });
  };
};
