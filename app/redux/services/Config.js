export const baseURL = {
    beta: 'http://dev1.appbrainz.com/projectm/',
    stage: 'https://stg-pm.appbrainz.com/',
    prod: 'http://dev1.appbrainz.com/projectm/',
  };
  
  export var API_ENDPOINT = baseURL.stage;
  //posts api
  export const API_METHOD_ALL_POSTS = '/api/posts';
  export const API_METHOD_POST_OF_THE_WEEK = '/api/posts/post-of-the-week';
  export const API_METHOD_POST_SCROLLABLE = '/api/posts/scrollable';
  //posts by category id
  export const API_METHOD_POSTS_BY_CATEGORY_ID = '/api/posts/category/'
  export const API_METHOD_STARTUP = 'api/startup';
  export const API_METHOD_MY_POSTS = '/api/post/my';
  export const API_METHOD_REMOVE_POST = '/api/post/remove';
  export const API_METHOD_MY_REQUESTED_ARTICLES = '/api/post/my-requests'
  export const API_METHOD_SUBMIT_POST = '/api/post/submit';
  export const API_METHOD_ADD_NEW_POST = '/api/post/add'
  export const API_METHOD_UPDATE_POST = '/api/post/update';
  export const API_METHOD_POST_CATEGORIES = '/api/posts-categories';
  export const API_METHOD_MY_PICKED_ARTICLES = '/api/post/my-picked-requests';
  // request article
  export const API_METHOD_REQUEST_ARTICLE = '/api/post/request';
  export const API_METHOD_UPDATE_REQUEST_ARTICLE = '/api/post/update-request';
  // All post by requested article id
  export const API_METHOD_POSTS_BY_REQUESTED_ID = '/api/post/all-by-requested-id';
  // post count
  export const API_METHOD_POSTS_COUNT = '/api/posts-counts';

  //loginWithMobileNum
  export const API_METHOD_LOGIN_WITH_MOBILE_NBUMBER = '/api/auth/send-otp';
  export const API_METHOD_VERIFY_OTP = '/api/auth/verify-otp';
  export const API_METHOD_RESEND_OTP = '/api/auth/resend-otp';
  export const API_USER_PROFILE = '/api/user';
  export const API_VERIFY_NEW_EMAIL = '/api/user/verify-new-email-otp';
  export const API_VERIFY_NEW_PHONE_NUMBER = '/api/user/verify-new-phone-otp';
  export const API_USER_LOGOUT = '/api/logout';
  export const API_TOGGLE_NOTIFICATION = '/api/user/toggle-notification';
  export const API_DELETE_ACCOUNT = '/api/delete-account';
  export const API_SET_GOALS = '/api/user/set-goal';
  export const API_UPDATE_USER_IMAGE = '/api/user/update-image';
  
  // contacts api 
  export const API_METHOD_ENTITIES = '/api/entities';
  export const API_METHOD_CATEGORIES = '/api/categories';
  export const API_METHOD_CONTACTS_OF_CATEGORIES = '/api/category/1000';

  // articles api's
  export const API_METHOD_ALL_REQUESTED_ARTICLES = '/api/post/all-requests';
  
  export const updateApiEndpoint = (endpoint) => {
    if (endpoint === 0) {
      API_ENDPOINT = baseURL.beta;
    } else if (endpoint === 1) {
      API_ENDPOINT = baseURL.stage;
    } else if (endpoint === 2) {
      API_ENDPOINT = baseURL.prod;
    } else if (endpoint) {
      API_ENDPOINT = endpoint;
    }
  };
