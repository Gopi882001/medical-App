import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import ArticlesDashboardScreen from "./ArticlesDashboardScreen";

const ArticlesDashboard = (props: any) => {
    return <ArticlesDashboardScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    postsCountData: state.postsReducer.postsCountData,
    postsCountError: state.postsReducer.postsCountError,
});

const mapDispatchToProps = (dispatch: any) => ({
    getPostsCount: () => {
        return dispatch(postActions.getPostsCount());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesDashboard);
