import * as ActionTypes from '../actions/ActionTypes';

export function getPost() {
    return {
        type: ActionTypes.GET_POST_REQUEST,
    };
}
export function getPostSuccess(response) {
    return {
        type: ActionTypes.GET_POST_SUCCESS,
        params: response,
    };
}
export function getPostFailure(error) {
    return {
        type: ActionTypes.GET_POST_FAILURE,
        params: error,
    };
}

export function getPostOfTheWeek() {
    return {
        type: ActionTypes.GET_POST_OF_THE_WEEK_REQUEST,
    };
}
export function getPostOfTheWeekSuccess(response) {
    return {
        type: ActionTypes.GET_POST_OF_THE_WEEK_SUCCESS,
        params: response,
    };
}
export function getPostOfTheWeekFailure(error) {
    return {
        type: ActionTypes.GET_POST_OF_THE_WEEK_FAILURE,
        params: error,
    };
}

export function postCategories() {
    return {
        type: ActionTypes.POST_CATEGORIES_REQUEST,
    };
}
export function postCategoriesSuccess(response) {
    return {
        type: ActionTypes.POST_CATEGORIES_SUCCESS,
        params: response,
    };
}
export function postCategoriesFailure(error) {
    return {
        type: ActionTypes.POST_CATEGORIES_FAILURE,
        params: error,
    };
}

export function getTopScrollable() {
    return {
        type: ActionTypes.GET_TOP_SCROLLABLE_REQUEST,
    };
}
export function getTopScrollableSuccess(response) {
    return {
        type: ActionTypes.GET_TOP_SCROLLABLE_SUCCESS,
        params: response,
    };
}
export function getTopScrollableFailure(error) {
    return {
        type: ActionTypes.GET_TOP_SCROLLABLE_FAILURE,
        params: error,
    };
}

export function myPosts() {
    return {
        type: ActionTypes.MY_POSTS_REQUEST,
    };
}
export function myPostsSuccess(response) {
    return {
        type: ActionTypes.MY_POSTS_SUCCESS,
        params: response,
    };
}
export function myPostsFailure(error) {
    return {
        type: ActionTypes.MY_POSTS_FAILURE,
        params: error,
    };
}

export function removePost() {
    return {
        type: ActionTypes.REMOVE_POST_REQUEST,
    };
}
export function removePostSuccess(response) {
    return {
        type: ActionTypes.REMOVE_POST_SUCCESS,
        params: response,
    };
}
export function removepostFailure(error) {
    return {
        type: ActionTypes.REMOVE_POST_FAILURE,
        params: error,
    };
}

export function myRequestedArticles() {
    return {
        type: ActionTypes.MY_REQUESTED_ARTICLES_REQUEST,
    };
}
export function myRequestedArticlesSuccess(response) {
    return {
        type: ActionTypes.MY_REQUESTED_ARTICLES_SUCCESS,
        params: response,
    };
}
export function myRequestedArticlesFailure(error) {
    return {
        type: ActionTypes.MY_REQUESTED_ARTICLES_FAILURE,
        params: error,
    };
}

export function submitPost() {
    return {
        type: ActionTypes.SUBMIT_POST_REQUEST,
    };
}
export function submitPostSuccess(response) {
    return {
        type: ActionTypes.SUBMIT_POST_SUCCESS,
        params: response,
    };
}
export function submitpostFailure(error) {
    return {
        type: ActionTypes.SUBMIT_POST_FAILURE,
        params: error,
    };
}

export function addNewPost(params) {
    return {
        type: ActionTypes.ADD_NEW_POST_REQUEST,
        params: params,
    };
}
export function addNewPostSuccess(response) {
    return {
        type: ActionTypes.ADD_NEW_POST_SUCCESS,
        params: response,
    };
}
export function addNewPostFailure(error) {
    return {
        type: ActionTypes.ADD_NEW_POST_FAILURE,
        params: error,
    };
}

export function updatePost(params) {
    return {
        type: ActionTypes.UPDATE_POST_REQUEST,
        params: params,
    };
}
export function updatePostSuccess(response) {
    return {
        type: ActionTypes.UPDATE_POST_SUCCESS,
        params: response,
    };
}
export function updatePostFailure(error) {
    return {
        type: ActionTypes.UPDATE_POST_FAILURE,
        params: error,
    };
}

export function allRequestedArticles() {
    return {
        type: ActionTypes.ALL_REQUESTED_ARTICLES_REQUEST,
    };
}
export function allRequestedArticlesSuccess(response) {
    return {
        type: ActionTypes.ALL_REQUESTED_ARTICLES_SUCCESS,
        params: response,
    };
}
export function allRequestedArticlesFailure(error) {
    return {
        type: ActionTypes.ALL_REQUESTED_ARTICLES_FAILURE,
        params: error,
    };
}

export function myPickedArticles() {
    return {
        type: ActionTypes.MY_PICKED_ARTICLES_REQUEST,
    };
}
export function myPickedArticlesSuccess(response) {
    return {
        type: ActionTypes.MY_PICKED_ARTICLES_SUCCESS,
        params: response,
    };
}
export function myPickedArticlesFailure(error) {
    return {
        type: ActionTypes.MY_PICKED_ARTICLES_FAILURE,
        params: error,
    };
}

export function requestArticle(params) {
    return {
        type: ActionTypes.REQUEST_ARTICLE_REQUEST,
        params: params,
    };
}
export function requestArticleSuccess(response) {
    return {
        type: ActionTypes.REQUEST_ARTICLE_SUCCESS,
        params: response,
    };
}
export function requestArticleFailure(error) {
    return {
        type: ActionTypes.REQUEST_ARTICLE_FAILURE,
        params: error,
    };
}

export function updateRequestArticle(params) {
    return {
        type: ActionTypes.UPDATE_REQUEST_ARTICLE_REQUEST,
        params: params,
    };
}
export function updateRequestArticleSuccess(response) {
    return {
        type: ActionTypes.UPDATE_REQUEST_ARTICLE_SUCCESS,
        params: response,
    };
}
export function updateRequestArticleFailure(error) {
    return {
        type: ActionTypes.UPDATE_REQUEST_ARTICLE_FAILURE,
        params: error,
    };
}

export function getPostsCount() {
    return {
        type: ActionTypes.POST_COUNT_REQUEST,
    };
}
export function getPostsCountSuccess(response) {
    return {
        type: ActionTypes.POST_COUNT_SUCCESS,
        params: response,
    };
}
export function getPostsCountFailure(error) {
    return {
        type: ActionTypes.POST_COUNT_FAILURE,
        params: error,
    };
}

export function getAllPostsByArticle(params) {
    return {
        type: ActionTypes.POST_BY_REQUESTED_ARTICLE_REQUEST,
        params: params,
    };
}
export function getAllPostsByArticleSuccess(response) {
    return {
        type: ActionTypes.POST_BY_REQUESTED_ARTICLE_SUCCESS,
        params: response,
    };
}
export function getAllPostsByArticleFailure(error) {
    return {
        type: ActionTypes.POST_BY_REQUESTED_ARTICLE_FAILURE,
        params: error,
    };
}
