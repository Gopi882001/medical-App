export const Environments = {
  beta: 0,
  stage: 1,
  prod: 2,
};

export const envName = (env) => {
  var name = '';
  switch (env) {
    case Environments.beta:
      name = 'Beta';
      break;
    case Environments.stage:
      name = 'Stage';
      break;
    case Environments.prod:
      name = 'Prod';
      break;
    default:
      name = 'Prod';
  }
  return name;
};

var _APP_ENV = Environments.beta;

export const updateAppEnv = (env) => {
  switch (env) {
    case Environments.beta:
      _APP_ENV = Environments.beta;
      break;
    case Environments.stage:
      _APP_ENV = Environments.stage;
      break;
    case Environments.prod:
      _APP_ENV = Environments.prod;
      break;
    default:
      _APP_ENV = Environments.prod;
  }
};

export const APP_ENV = () => {
  return _APP_ENV;
};

export const LOADING_STATE = {
  NOT_STARTED: 0,
  STARTED: 1,
  COMPLETED: 2,
};

var _LOADING_STATUS = LOADING_STATE.NOT_STARTED;

export const updateLoadingStatus = (env) => {
  switch (env) {
    case LOADING_STATE.STARTED:
      _LOADING_STATUS = LOADING_STATE.STARTED;
      break;
    case LOADING_STATE.COMPLETED:
      _LOADING_STATUS = LOADING_STATE.COMPLETED;
      break;
    case LOADING_STATE.NOT_STARTED:
      _LOADING_STATUS = LOADING_STATE.NOT_STARTED;
      break;
    default:
      _LOADING_STATUS = LOADING_STATE.NOT_STARTED;
  }
};

export const LOADING_STATUS = () => {
  return _LOADING_STATUS;
};

var _userToken = null;
var _isUserLoggedIn = false;
export const updateUserToken = (userTokenStr = '{}') => {
  if (userTokenStr === '') {
    userTokenStr = '{}';
  }
  _userToken = JSON.parse(userTokenStr);
  if (_userToken.data) {
    _isUserLoggedIn = true;
  } else {
    _isUserLoggedIn = false;
  }
};

export const setIsUserLoggedIn = (loginStatus = false) => {
  _isUserLoggedIn = loginStatus;
};

export const userToken = () => {
  return _userToken;
};

export const isUserLoggedIn = () => {
  return _isUserLoggedIn;
};


var _startupParamsFile = {};
export const updateStartupParamsFile = (fileName) => {
  if (fileName) {
    _startupParamsFile = fileName;
  }
};

export const startupParamsFile = () => {
  return _startupParamsFile;
};

var _assetBaseUrl = 'https://dhfp6cbxih843.cloudfront.net/';
export const updateAssetBaseURL = (url) => {
  if (url) {
    _assetBaseUrl = url;
  }
};

export const assetBaseUrl = () => {
  return _assetBaseUrl;
};

var _SAtoken = '';
export const updateSAtoken = (token) => {
  if (token) {
    _SAtoken = token;
  }
};

export const saToken = () => {
  return _SAtoken;
};

var _privacyPolicyUrl = 'https://ideaxecution.com/privacy';
export const updatePrivacyPolicyURL = (url) => {
  if (url) {
    _privacyPolicyUrl = url;
  }
};

export const privacyPolicyUrl = () => {
  return _privacyPolicyUrl;
};

export var _rateAppUrl = '';
export const updateRateAppURL = (url) => {
  if (url) {
    _rateAppUrl = url;
  }
};

export const rateAppUrl = () => {
  return _rateAppUrl;
};

export var _supportUrl = 'https://ideaxecution.com/contact';
export const updateSupportURL = (url) => {
  if (url) {
    _supportUrl = url;
  }
};
export const supportUrl = () => {
  return _supportUrl;
};

export var _tncUrl = 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/terms.html';
export const updateTncUrl = (url) => {
  if (url) {
    _tncUrl = url;
  }
};
export const tncUrl = () => {
  return _tncUrl;
};

export var _appVersion = '';
export const updateAppVersion = (v) => {
  if (v) {
    _appVersion = v;
  }
};
export const appVersion = () => {
  return _appVersion;
};

export var _systemFonts = {};
export const updateSystemFonts = (v) => {
  if (v) {
    _systemFonts = JSON.parse(v);
  }
};
export const systemFonts = () => {
  return _systemFonts;
};

var _deviceInfo = {};
export const updateDeviceInfo = (di) => {
  if (di) {
    _deviceInfo = di;
  }
};
export const deviceInfo = () => {
  return _deviceInfo;
};

var _userRegisteredEvents = [];

export const updateUserRegisteredEvents = (eventId) => {
  _userRegisteredEvents.push(eventId);
};

export const getUserRegisteredEvents = () => {
  return _userRegisteredEvents;
};

export const resetUserRegisteredEvents = () => {
  _userRegisteredEvents = [];
};

var _userUnregisteredEvents = [];

export const updateUserUnregisteredEvents = (eventId) => {
  _userUnregisteredEvents.push(eventId);
};

export const getUserUnregisteredEvents = () => {
  return _userUnregisteredEvents;
};

export const resetUserUnregisteredEvents = () => {
  _userUnregisteredEvents = [];
};

var _shouldReloadLanding = false;
export const setReloadLanding = (flag) => {
  _shouldReloadLanding = flag;
};

export const shouldReloadLanding = () => {
  return _shouldReloadLanding;
};

var _phoneNumber = '';
export const updatePhoneNumber = (phoneNumber) => {
  if (phoneNumber) {
    _phoneNumber = phoneNumber;
  }
};

export const phoneNumber = () => {
  return _phoneNumber;
};

var _token = '';
export const updateToken = (token) => {
  if (token) {
    _token = token;
  }
};

export const token = () => {
  return _token;
}

var _userProfile = '';
export const updateUserProfile = (data) => {
  if (data) {
    _userProfile = data;
  }
};

export const userProfile = () => {
  return _userProfile;
};

var _titles = [];
export const updateTitles = (data) => {
  if (data) {
    _titles = data;
  }
};
export const getTitles = () => {
  return _titles;
};

var _postCategories = [];
export const updatePostCategories = (data) => {
  if (data) {
    _postCategories = data;
  }
};
export const getPostCategories = () => {
  return _postCategories;
};

var _selectedPost = [];
export const updateSelectedPost = (data) => {
  if (data) {
    _selectedPost = data;
  }
};
export const getSelectedPost = () => {
  return _selectedPost;
};

var _selectedArticle = [];
export const updateSelectedArticle = (data) => {
  if (data) {
    _selectedArticle = data;
  }
};
export const getSelectedArticle = () => {
  return _selectedArticle;
};
