import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  isLoading: false,
  inactiveTimestamp: null,
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.START_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.STOP_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.SET_INACTIVE_TIMESTAMP:
      return {
        ...state,
        inactiveTimestamp: action.timestamp,
      };
    default:
      return {
        ...state,
      };
  }
}

export default commonReducer;
