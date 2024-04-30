import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import RequestArticleScreen from './RequestArticleScreen';

const RequestedArticleContainer = (props: any) => {
    return <RequestArticleScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    requestArticleData: state.postsReducer.requestArticleData,
    requestArticleError: state.postsReducer.requestArticleError,
    updateRequestArticleData: state.postsReducer.updateRequestArticleData,
    updateRequestArticleError: state.postsReducer.updateRequestArticleError,
});

const mapDispatchToProps = (dispatch: any) => ({
    requestArticle: (params: any) => {
        return dispatch(postActions.requestArticle(params));
    },
    updateRequestArticle: (params: any) => {
        return dispatch(postActions.updateRequestArticle(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestedArticleContainer);
