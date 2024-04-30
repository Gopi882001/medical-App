import * as ActionTypes from './ActionTypes';

export function getStartupDataSuccess(params) {
    return {
        type: ActionTypes.GET_STARTUP_SUCCESS,
        params: params,
    };
}

export function getStartupDataFailure(error) {
    return {
        type: ActionTypes.GET_STARTUP_FAILURE,
        error,
    };
}

export function getStartupData(params) {
    return {
        type: ActionTypes.GET_STARTUP_REQUEST,
        params: params,
    };
}