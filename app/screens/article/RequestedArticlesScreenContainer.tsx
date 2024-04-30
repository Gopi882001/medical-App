import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import RequestedArticlesScreen from "../../screens/article/RequestedArticlesScreen";

const RequestArticlesScreen = (props: any) => {
    return <RequestedArticlesScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    myRequestedArticlesData: state.postsReducer.myRequestedArticlesData,
    myRequestedArticlesError: state.postsReducer.myRequestedArticlesError,
});

const mapDispatchToProps = (dispatch: any) => ({
    myPosts: () => {
        return dispatch(postActions.myRequestedArticles());

    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestArticlesScreen);
