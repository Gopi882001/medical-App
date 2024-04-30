import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  startupData: null,
  startupError: null
};

function startupReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_STARTUP_REQUEST:
      return {
        ...state,
        startupData: null,
        startupError: null,
      };
    case ActionTypes.GET_STARTUP_SUCCESS:
      return {
        ...state,
        startupData: action.params,
        startupError: null,
      };
    case ActionTypes.GET_STARTUP_FAILURE:
      return {
        ...state,
        startupData: null,
        startupError: JSON.parse(action.params),
      };

    default:
      return {
        ...state,
      };
  }
}

export default startupReducer;
