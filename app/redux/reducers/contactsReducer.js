import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    entitiesData: null,
    entitiesError: null,
    categoriesData: null,
    categoriesError: null,
    contactsOfCategoryData: null,
    contactsOfCategoryError: null,
};

function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_ENTITIES_REQUEST:
            return {
                ...state,
                entitiesData: null,
                entitiesError: null,
            };
        case ActionTypes.GET_ENTITIES_SUCCESS:
            return {
                ...state,
                entitiesData: action.params,
                entitiesError: null,
            };
        case ActionTypes.GET_ENTITIES_FAILURE:
            return {
                ...state,
                entitiesData: null,
                entitiesError: JSON.parse(action.params),
            };

        case ActionTypes.GET_CATEGORIES_REQUEST:
            return {
                ...state,
                categoriesData: null,
                categoriesError: null,
            };
        case ActionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categoriesData: action.params,
                categoriesError: null,
            };
        case ActionTypes.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                categoriesData: null,
                categoriesError: JSON.parse(action.params),
            };

        case ActionTypes.GET_CONTACTS_OF_CATEGORIES_REQUEST:
            return {
                ...state,
                contactsOfCategoryData: null,
                contactsOfCategoryError: null,
            };
        case ActionTypes.GET_CONTACTS_OF_CATEGORIES_SUCCESS:
            return {
                ...state,
                contactsOfCategoryData: action.params,
                contactsOfCategoryError: null,
            };
        case ActionTypes.GET_CONTACTS_OF_CATEGORIES_FAILURE:
            return {
                ...state,
                contactsOfCategoryData: null,
                contactsOfCategoryError: JSON.parse(action.params),
            };

        default:
            return {
                ...state,
            };
    }
}

export default contactsReducer;
