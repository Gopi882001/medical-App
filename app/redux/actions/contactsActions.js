import * as ActionTypes from '../actions/ActionTypes';

export function getEntitiesSuccess(response) {
    return {
        type: ActionTypes.GET_ENTITIES_SUCCESS,
        params: response,
    };
}

export function getEntitiesFailure(error) {
    return {
        type: ActionTypes.GET_ENTITIES_FAILURE,
        params: error,
    };
}

export function getEntities(params) {
    return {
        type: ActionTypes.GET_ENTITIES_REQUEST,
        params: params,
    };
}

export function getCategories() {
    return {
        type: ActionTypes.GET_CATEGORIES_REQUEST,
    };
}

export function getCategoriesSuccess(response) {
    return {
        type: ActionTypes.GET_CATEGORIES_SUCCESS,
        params: response,
    };
}

export function getCategoriesFailure(error) {
    return {
        type: ActionTypes.GET_CATEGORIES_FAILURE,
        params: error,
    }
}

export function getContactsOfCategories(params) {
    return {
        type: ActionTypes.GET_CONTACTS_OF_CATEGORIES_REQUEST,
        params: params,
    };
}
export function getContactsOfCategoriesSuccesss(response) {
    return {
        type: ActionTypes.GET_CONTACTS_OF_CATEGORIES_SUCCESS,
        params: response,
    };
}
export function getContactsOfCategoriesFailure(error) {
    return {
        type: ActionTypes.GET_CONTACTS_OF_CATEGORIES_FAILURE,
        params: error,
    }
}
