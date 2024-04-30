import * as ActionTypes from './ActionTypes';

export function startLoader() {
    return {
      type: ActionTypes.START_LOADING_SUCCESS,
    };
  }
  
  export function stopLoader() {
    return {
      type: ActionTypes.STOP_LOADING_SUCCESS,
    };
  }
  
  export function setInactiveTimestamp(timestamp) {
    return {
      type: ActionTypes.SET_INACTIVE_TIMESTAMP,
      timestamp: timestamp,
    };
  }
  