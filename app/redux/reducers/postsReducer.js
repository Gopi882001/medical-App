import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  postsResponse: null,
  postsError: null,
  postOfTheWeekData: null,
  postOfTheWeekError: null,
  topScrollableData: null,
  topScrollableError: null,
  myPostsData: null,
  myPostsError: null,
  removePostData: null,
  removePostError: null,
  myRequestedArticlesData: null,
  myRequestedArticlesError: null,
  submitPostData: null,
  submitPostError: null,
  addNewPostData: null,
  addNewPostError: null,
  updatePostData: null,
  updatePostError: null,
  allRequestedArticlesData: null,
  allRequestedArticlesError: null,
  postCategoriesData: null,
  postCategoriesError: null,
  myPickedArticlesData: null,
  myPickedArticlesError: null,
  requestArticleData: null,
  requestArticleError: null,
  updateRequestArticleData: null,
  updateRequestArticleError: null,
  postsCountData: null, 
  postsCountError: null,
  postsByArticleIdData: null,
  postsByArticleIdError: null,
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_POST_REQUEST:
      return {
        ...state,
        postsResponse: null,
        postsError: null,
      };
    case ActionTypes.GET_POST_SUCCESS:
      return {
        ...state,
        postsResponse: action.params,
        postsError: null,
      };
    case ActionTypes.GET_POST_FAILURE:
      return {
        ...state,
        postsError: JSON.parse(action.params),
        postsResponse: null,
      };

    case ActionTypes.GET_POST_OF_THE_WEEK_REQUEST:
      return {
        ...state,
        postOfTheWeekData: null,
        postOfTheWeekError: null,
      };
    case ActionTypes.GET_POST_OF_THE_WEEK_SUCCESS:
      return {
        ...state,
        postOfTheWeekData: action.params,
        postOfTheWeekError: null
      };
    case ActionTypes.GET_POST_OF_THE_WEEK_FAILURE:
      return {
        ...state,
        postOfTheWeekData: null,
        postOfTheWeekError: JSON.parse(action.params),
      };

    case ActionTypes.GET_TOP_SCROLLABLE_REQUEST:
      return {
        ...state,
        topScrollableData: null,
        topScrollableError: null,
      };
    case ActionTypes.GET_TOP_SCROLLABLE_SUCCESS:
      return {
        ...state,
        topScrollableData: action.params,
        topScrollableError: null,
      };
    case ActionTypes.GET_TOP_SCROLLABLE_FAILURE:
      return {
        ...state,
        topScrollableData: null,
        topScrollableError: JSON.parse(action.params),
      };

    case ActionTypes.MY_POSTS_REQUEST:
      return {
        ...state,
        myPostsData: null,
        myPostsError: null,
      };
    case ActionTypes.MY_POSTS_SUCCESS:
      return {
        ...state,
        myPostsData: action.params,
        myPostsError: null,
      };
    case ActionTypes.MY_POSTS_FAILURE:
      return {
        ...state,
        myPostsData: null,
        myPostsError: JSON.parse(action.params),
      };

    case ActionTypes.REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostData: null,
        removePostError: null,
      };
    case ActionTypes.REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostData: action.params,
        removePostError: null,
      };
    case ActionTypes.REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostData: null,
        removePostError: JSON.parse(action.params),
      };

    case ActionTypes.MY_REQUESTED_ARTICLES_REQUEST:
      return {
        ...state,
        myRequestedArticlesData: null,
        myRequestedArticlesError: null,
      };
    case ActionTypes.MY_REQUESTED_ARTICLES_SUCCESS:
      return {
        ...state,
        myRequestedArticlesData: action.params,
        myRequestedArticlesError: null,
      };
    case ActionTypes.MY_REQUESTED_ARTICLES_FAILURE:
      return {
        ...state,
        myRequestedArticlesData: null,
        myRequestedArticlesError: JSON.parse(action.params),
      };

    case ActionTypes.SUBMIT_POST_REQUEST:
      return {
        ...state,
        submitPostData: null,
        submitPostError: null,
      };
    case ActionTypes.SUBMIT_POST_SUCCESS:
      return {
        ...state,
        submitPostData: action.params,
        submitPostError: null,
      };
    case ActionTypes.SUBMIT_POST_FAILURE:
      return {
        ...state,
        submitPostData: null,
        submitPostError: JSON.parse(action.params),
      };

    case ActionTypes.ADD_NEW_POST_REQUEST:
      return {
        ...state,
        addNewPostData: null,
        addNewPostError: null,
      };
    case ActionTypes.ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        addNewPostData: action.params,
        addNewPostError: null,
      };
    case ActionTypes.ADD_NEW_POST_FAILURE:
      return {
        ...state,
        addNewPostData: null,
        addNewPostError: JSON.parse(action.params),
      };

    case ActionTypes.UPDATE_POST_REQUEST:
      return {
        ...state,
        updatePostData: null,
        updatePostError: null,
      };
    case ActionTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatePostData: action.params,
        updatePostError: null,
      };
    case ActionTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        updatePostData: null,
        updatePostError: JSON.parse(action.params),
      };

    case ActionTypes.ALL_REQUESTED_ARTICLES_REQUEST:
      return {
        ...state,
        allRequestedArticlesData: null,
        allRequestedArticlesError: null,
      };
    case ActionTypes.ALL_REQUESTED_ARTICLES_SUCCESS:
      return {
        ...state,
        allRequestedArticlesData: action.params,
        allRequestedArticlesError: null,
      };
    case ActionTypes.ALL_REQUESTED_ARTICLES_FAILURE:
      return {
        ...state,
        allRequestedArticlesData: null,
        allRequestedArticlesError: JSON.parse(action.params),
      };

    case ActionTypes.POST_CATEGORIES_REQUEST:
      return {
        ...state,
        postCategoriesData: null,
        postCategoriesError: null,
      };
    case ActionTypes.POST_CATEGORIES_SUCCESS:
      return {
        ...state,
        postCategoriesData: action.params,
        postCategoriesError: null,
      };
    case ActionTypes.POST_CATEGORIES_FAILURE:
      return {
        ...state,
        postCategoriesData: null,
        postCategoriesError: JSON.parse(action.params),
      };

    case ActionTypes.MY_PICKED_ARTICLES_REQUEST:
      return {
        ...state,
        myPickedArticlesData: null,
        myPickedArticlesError: null,
      };
    case ActionTypes.MY_PICKED_ARTICLES_SUCCESS:
      return {
        ...state,
        myPickedArticlesData: action.params,
        myPickedArticlesError: null,
      };
    case ActionTypes.MY_PICKED_ARTICLES_FAILURE:
      return {
        ...state,
        myPickedArticlesData: null,
        myPickedArticlesError: JSON.parse(action.params),
      };

    case ActionTypes.REQUEST_ARTICLE_REQUEST:
      return {
        ...state,
        requestArticleData: null,
        requestArticleError: null,
      };
    case ActionTypes.REQUEST_ARTICLE_SUCCESS:
      return {
        ...state,
        requestArticleData: action.params,
        requestArticleError: null,
      };
    case ActionTypes.REQUEST_ARTICLE_FAILURE:
      return {
        ...state,
        requestArticleData: null,
        requestArticleError: JSON.parse(action.params),
      };

    case ActionTypes.UPDATE_REQUEST_ARTICLE_REQUEST:
      return {
        ...state,
        updateRequestArticleData: null,
        updateRequestArticleError: null,
      };
    case ActionTypes.UPDATE_REQUEST_ARTICLE_SUCCESS:
      return {
        ...state,
        updateRequestArticleData: action.params,
        updateRequestArticleError: null,
      };
    case ActionTypes.UPDATE_REQUEST_ARTICLE_FAILURE:
      return {
        ...state,
        updateRequestArticleData: null,
        updateRequestArticleError: JSON.parse(action.params),
      };

    case ActionTypes.POST_COUNT_REQUEST:
      return {
        ...state,
        postsCountData: null,
        postsCountError: null,
      };
    case ActionTypes.POST_COUNT_SUCCESS:
      return {
        ...state,
        postsCountData: action.params,
        postsCountError: null,
      };
    case ActionTypes.POST_COUNT_FAILURE:
      return {
        ...state,
        postsCountData: null,
        postsCountError: JSON.parse(action.params),
      };

    case ActionTypes.POST_BY_REQUESTED_ARTICLE_REQUEST:
      return {
        ...state,
        postsByArticleIdData: null,
        postsByArticleIdError: null,
      };
    case ActionTypes.POST_BY_REQUESTED_ARTICLE_SUCCESS:
      return {
        ...state,
        postsByArticleIdData: action.params,
        postsByArticleIdError: null,
      };
    case ActionTypes.POST_BY_REQUESTED_ARTICLE_FAILURE:
      return {
        ...state,
        postsByArticleIdData: null,
        postsByArticleIdError: JSON.parse(action.params),
      };

    default:
      return {
        ...state,
      };
  }
}

export default postsReducer;
