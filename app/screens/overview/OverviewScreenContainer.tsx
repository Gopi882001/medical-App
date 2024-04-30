import React from "react";
import { connect } from 'react-redux';
import OverviewScreenComponent from "./OverviewScreenComponent";
import * as postActions from '../../redux/actions/PostActions';
import * as contactsActions from '../../redux/actions/contactsActions';
import * as authActions from '../../redux/actions/authActions';

const OverviewScreen = (props: any) => {
    return <OverviewScreenComponent {...props} />;
}

const mapStateToProps = (state: any) => ({
    postsResponse: state.postsReducer.postsResponse,
    postsError: state.postsReducer.postsError,
    categoriesData: state.contactsReducer.categoriesData,
    categoriesError: state.contactsReducer.categoriesError,
    entitiesData: state.contactsReducer.entitiesData,
    entitiesError: state.contactsReducer.entitiesError,
    topScrollableData: state.postsReducer.topScrollableData,
    topScrollableError: state.postsReducer.topScrollableError,
    postOfTheWeekData: state.postsReducer.postOfTheWeekData,
    postOfTheWeekError: state.postsReducer.postOfTheWeekError,
    postCategoriesData: state.postsReducer.postCategoriesData,
    postCategoriesError: state.postsReducer.postCategoriesError,
    userProfileData: state.authReducer.userProfileData,
    userProfileError: state.authReducer.userProfileError,
});

const mapDispatchToProps = (dispatch: any) => ({
    getEntities: (params: any) => {
        return dispatch(contactsActions.getEntities(params));
    },
    getPost: () => {
        return dispatch(postActions.getPost());
    },
    getPostOfTheWeeks: () => {
        return dispatch(postActions.getPostOfTheWeek());
    },
    getScrollablePosts: () => {
        return dispatch(postActions.getTopScrollable());
    },
    getCategories: () => {
        return dispatch(contactsActions.getCategories());
    },
    postCategories: () => {
        return dispatch(postActions.postCategories());
    },
    getUserProfile: () => {
        return dispatch(authActions.userProfile());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen);
