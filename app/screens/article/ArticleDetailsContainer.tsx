import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import ArticleDetailsScreen from "./ArticleDetailsScreen";

const ArticleDetails = (props: any) => {
    return <ArticleDetailsScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    postsByArticleIdData: state.postsReducer.postsByArticleIdData,
    postsByArticleIdError: state.postsReducer.postsByArticleIdError,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllPostsByArticle: (params: any) => {
        return dispatch(postActions.getAllPostsByArticle(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
