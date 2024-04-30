/**
 * All Global Constants will listed here
 */

import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

//Current Screen Constatnts
export const CURRENT_SCREEN_HEIGHT = height;
export const CURRENT_SCREEN_WIDTH = width;

//Design Screen Constatnts
export const SCREEN_HEIGHT = 667;
export const SCREEN_WIDTH = 375;

export const TOUCHABLE_ACTIVE_OPACITY = 0.7;

// Paggination Constants
export const RECORDS_PER_PAGE = 10;
export const NEW_RECORDS_PER_PAGE = 5;

// Color Constants
export const WHITE_COLOR = '#FFFFFF';
export const HEADER_COLOR = '#111521';

// Font Weight Constants
export const fontWeight = {
  Thin: '100',
  UltraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  Semibold: '600',
  Bold: '700',
  Heavy: '800',
  Black: '900',
};

// Font Family constants 'TODO custom fonts needs to install'
export const fontFamily = {
  TitilliumWeb: 'TitilliumWeb-Regular',
};

// CONFIGURATIONS
export const API_TIMEOUT = 30000;

// API CALLING CONSTANTS
export const GET_API = 'GET';
export const POST_API = 'POST';
export const PUT_API = 'PUT';
export const DELETE_API = 'DELETE';
export const UPDATE_API = 'PUT';


//ERROR CONSTANTS
export const NO_NETWORK_ERROR =
  'Your network seems to be very slow or not connected, please check and try again.';
export const SOMETHING_WENT_WRONG = 'Something went wrong';

// Style Constants
export const POSITION_ABSOLUTE = 'absolute';
export const POSITION_RELATIVE = 'relative';
export const CENTER = 'center';
export const LEFT = 'left';
export const UNDEFINED = 'undefined';
export const SPACE_BETWEEN = 'space-between';
export const FLEX_START = 'flex-start';
export const FLEX_END = 'flex-end';
export const ROW = 'row';
export const ROW_REVERSE = 'row-reverse';
export const COLUMN = 'column';
export const WINDOW = 'window';
export const PLATFORM_ANDROID = 'android';
export const PLATFORM_IOS = 'ios';
export const POSITION_RIGHT = 'right';
export const SPACE_AROUND = 'space-around';
export const STRETCH = 'stretch';
export const CONTAIN = 'contain';
export const BOLD = 'bold';
export const NORMAL_TEXT = 'normal';

export const USER_AUTH_ERROR = 'auth.access_token_not_found';

//Image constants
export const BACK_ICON = require('../assets/common/back.png');
export const APP_LOGO = require('../assets/common/logo.png');
export const HAMBERGER_ICON = require('../assets/common/menu_icon.png');
export const EDIT_PROFILE_ICON = require('../assets/userProfile/person-profile-image-icon.png');
export const LOGOUT_ICON = require('../assets/userProfile/logout-line.png');
export const CHANGE_GOAL_ICON = require('../assets/userProfile/ic_goal.png');
export const CHANGE_PASSWORD_ICON = require('../assets/userProfile/door-key.png');
export const NOTIFICATION_ICON = require('../assets/userProfile/notification-alert-icon.png');
export const GRID_ICON = require('../assets/common/grid.png');

export const ARROW_ICON = require('../assets/userProfile/arrow.png');
export const ARROW_WITH_BG_ICON = require('../assets/common/ic_arrow.png');
export const ARROW_DOWN_ICON = require('../assets/common/arrow_down.png');
export const CLOSE_BLACK_ICON = require('../assets/common/close_black.png');
export const CLOSE_ROUND_ICON = require('../assets/login/ic_close_round.png');
export const CANCEL_ICON = require('../assets/common/ic_cancel.png');
export const DELETE_ICON = require('../assets/common/delete_icon.png');
export const SHARE_ICON = require('../assets/common/ic_share.png');
export const MORE_ICON = require('../assets/common/more.png');
export const MORE_DOWN_ICON = require('../assets/common/more_down.png');
export const SEARCH_ICON = require('../assets/common/search.png');
export const CHECK_ICON = require('../assets/common/check.png');
export const STAR_NORMAL = require('../assets/common/star_normal.png');
export const STAR_SELECT = require('../assets/common/star_select.png');
export const ADD_ROUND_BLUE = require('../assets/common/ic_add_round_blue.png');

export const ALL_ARTICLES_ICON = require('../assets/blog/all_requested_article.png');
export const MY_PICKED_ARTICLES_ICON = require('../assets/blog/my_picked_articles.png');
export const MY_ARTICLES_ICON = require('../assets/blog/my_article.png');
export const REQUESTED_ARTICLES_ICON = require('../assets/blog/requested_article.png');
export const WRITE_ARTICLES_ICON = require('../assets/blog/write_article.png');

export const ADD_ICON = require('../assets/userProfile/add.png');
export const LOGIN_LOGO_ICON = require('../assets/login/logoforlogin.png');
export const PHONE_ICON = require('../assets/login/phone_icon.png');
export const PROFILE_ICON = require('../assets/common/profile.png');
export const CALL_NOW_ICON = require('../assets/common/ic_call_now.png');

export const DEFAULT_IMAGE = require('../assets/common/default_image.png');
export const CAROUSAL = require('../assets/common/carousel.png');
export const PICKED_ARTICLES_ICON = require('../assets/blog/picked.png');
export const GREEN_BG_IMAGE = require('../assets/common/greenimage.png');
export const DONE_BUTTON = require('../assets/common/donebutton.png');
export const APPLE_ICON = require('../assets/login/apple_icon.png');
export const GMAIL_ICON = require('../assets/login/gmail_icon.png');
export const APPROVED_ACCEPT = require('../assets/login/approved-accept.png');
export const SUBMIT_ICON = require('../assets/common/button_submit.png');
export const ADD_TITLE_BG = require('../assets/blog/add_title_bg.png');
export const ADD_IMAGE = require('../assets/common/ic_image.png');
export const ADD_CONTENT = require('../assets/common/ic_content.png');
export const LOGIN_LOGO = require('../assets/login/logoforlogin.png');
export const SLEEP_CAT = require('../assets/common/sleepingCat.png')
export const CAT_IMAGE = require('../assets/common/catImage1.png');
export const RESIZE_IMAGE = require('../assets/common/resize_image.png');
export const RESIZE_IMAGE_WHITE = require('../assets/common/resize_image_white.png');

// Navigation Screens
export const OverviewScreen = 'OverviewScreen';
export const EditProfile = 'EditProfile';
export const ChangeGoal = 'ChangeGoal';
export const UserProfile = 'UserProfile';

// Async Storage Key's
export const SA_TOKEN = "SA_TOKEN";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
