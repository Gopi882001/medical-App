import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import WriteArticleScreen from './WriteArticleScreenComponent';

const WriteAricleScreen = (props: any) => {
    return <WriteArticleScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    updatePost: state.postsReducer.updatePostData,
    updateError: state.postsReducer.updatePostError,
    submitPostData: state.postsReducer.submitPostData,
    submitPostError: state.postsReducer.submitPostError,
    addNewPostData: state.postsReducer.addNewPostData,
    addNewPostError: state.postsReducer.addNewPostError,
});

const mapDispatchToProps = (dispatch: any) => ({
    removePost: () => {
        return dispatch(postActions.removePost());
    },
    submitPost: () => {
        return dispatch(postActions.submitPost());
    },
    addNewPost: (params: any) => {
        return dispatch(postActions.addNewPost(params));
    },
    update: (params: any) => {
        return dispatch(postActions.updatePost(params));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteAricleScreen);
